import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaImage, FaUpload, FaTrash } from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import { PRODUCT_CATEGORIES } from "../../constants/productCategories";

const DRAFT_KEY = "tkm-scraps-add-draft";
const PREVIEW_KEY = "tkm-scraps-add-image-preview";

// Helper to convert base64 Data URL to a real File object
function dataURLtoFile(dataurl, filename = "scrap-image.jpg") {
  try {
    const arr = dataurl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  } catch (err) {
    console.error("Error converting dataURL to file:", err);
    return null;
  }
}

// Client-side image optimizer to keep uploads fast and lightweight
function optimizeImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.85) {
  return new Promise((resolve) => {
    // If not an image or SVG, return as is
    if (!file || !file.type.startsWith("image/") || file.type.includes("svg")) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            maxHeight = height;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            const optimized = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
              type: mime,
            });
            resolve(optimized);
          },
          mime,
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

const CardForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Others",
    file: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Restore draft and synchronize preview with File object
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      let initialForm = {
        title: "",
        price: "",
        category: "Others",
        file: null,
      };

      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        initialForm = {
          ...initialForm,
          title: parsed.title || "",
          price: parsed.price || "",
          category: parsed.category || "Others",
        };
      }

      const savedPreview = sessionStorage.getItem(PREVIEW_KEY);
      if (savedPreview) {
        setPreviewUrl(savedPreview);
        const restoredFile = dataURLtoFile(savedPreview);
        if (restoredFile) {
          initialForm.file = restoredFile;
        }
      }

      setFormData(initialForm);
    } catch (err) {
      console.error("Error reading draft:", err);
    }
  }, []);

  // Save text draft to localStorage
  useEffect(() => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        title: formData.title,
        price: formData.price,
        category: formData.category,
      })
    );
  }, [formData.title, formData.price, formData.category]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const selected = files?.[0];
      if (!selected) return;

      // Create quick instant preview
      const objectUrl = URL.createObjectURL(selected);
      setPreviewUrl(objectUrl);

      // Optimize image in background and store base64 preview
      const optimized = await optimizeImageFile(selected);
      setFormData((prev) => ({ ...prev, file: optimized }));

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          try {
            sessionStorage.setItem(PREVIEW_KEY, reader.result);
          } catch (storageErr) {
            console.warn("sessionStorage full:", storageErr);
          }
        }
      };
      reader.readAsDataURL(optimized);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const removeImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sessionStorage.removeItem(PREVIEW_KEY);
    setPreviewUrl("");
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    sessionStorage.removeItem(PREVIEW_KEY);
    setPreviewUrl("");
    setFormData({
      title: "",
      price: "",
      category: "Others",
      file: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitting = async (e) => {
    e.preventDefault();

    // If previewUrl is set but formData.file is somehow empty, attempt one last restore
    let fileToSend = formData.file;
    if (!fileToSend && previewUrl && previewUrl.startsWith("data:")) {
      fileToSend = dataURLtoFile(previewUrl);
    }

    if (!formData.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Name",
        text: "Please enter the scrap material name.",
      });
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing Price",
        text: "Please enter a valid price greater than ₹0.",
      });
      return;
    }

    if (!fileToSend) {
      Swal.fire({
        icon: "warning",
        title: "Missing Image",
        text: "Please upload a photo of the scrap product before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataObj = new FormData();
      // Append both 'file' and 'image' to prevent any backend field name mismatch
      formDataObj.append("file", fileToSend);
      formDataObj.append("image", fileToSend);
      formDataObj.append("title", formData.title.trim());
      formDataObj.append("price", String(formData.price));
      formDataObj.append("category", formData.category);

      const response = await axios.post(`${API_BASE_URL}/card`, formDataObj, {
        timeout: 45000,
      });

      if (response.data) {
        clearDraft();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Scrap item added successfully!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    } catch (error) {
      console.error("Error adding scrap:", error);
      const errMsg = error.response?.data?.message || "Could not save scrap product. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: errMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-2xl border border-[#DCE8DE] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-2 border-b border-[#E5EDE6] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Scrap</h2>
            <p className="mt-1 text-sm text-gray-500">Create a rate card for the public Scrap Rates page.</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8F5E9] px-3 py-1.5 text-xs font-semibold text-[#157A1A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#18931D]" /> Draft saved automatically
          </span>
        </div>

        <form onSubmit={handleSubmitting} className="grid grid-cols-1 gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-semibold text-gray-800">
                Scrap Name
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                placeholder="e.g. Copper Wire, Aluminum Utensils, Newspaper"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#18931D] focus:bg-white focus:ring-4 focus:ring-[#18931D]/10"
                value={formData.title}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-semibold text-gray-800">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  onChange={handleChange}
                  value={formData.category}
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#18931D] focus:bg-white focus:ring-4 focus:ring-[#18931D]/10"
                >
                  {PRODUCT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price" className="mb-2 block text-sm font-semibold text-gray-800">
                  Price (₹)
                </label>
                <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-[#FAFCFA] transition focus-within:border-[#18931D] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#18931D]/10">
                  <span className="flex items-center border-r border-gray-200 px-4 text-sm font-bold text-[#18931D]">₹</span>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    min="1"
                    step="any"
                    onChange={handleChange}
                    placeholder="Enter rate"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                    value={formData.price}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#18931D] py-3.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(24,147,29,0.22)] transition hover:bg-[#15801A] disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? "Saving Scrap..." : "Confirm Add Scrap"}
            </button>
          </div>

          <div className="flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Product Image</label>
              <span className="text-xs text-gray-500">PNG, JPG, WEBP</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              name="file"
              id="file"
              className="sr-only"
              onChange={handleChange}
              accept="image/*"
            />

            <div className="relative flex min-h-[260px] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#CDE7D0] bg-[#F7FBF8] p-4 text-center transition hover:border-[#18931D] hover:bg-[#F2FAF3]">
              {previewUrl ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Scrap preview"
                    className="h-[220px] w-full object-contain rounded-lg"
                  />
                  <div className="mt-3 flex items-center gap-2">
                    <label
                      htmlFor="file"
                      className="cursor-pointer rounded-lg bg-gray-900/80 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-900"
                    >
                      Change photo
                    </label>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="inline-flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600 cursor-pointer"
                    >
                      <FaTrash className="text-[10px]" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label htmlFor="file" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-[#18931D] shadow-sm">
                    <FaImage />
                  </span>
                  <p className="text-sm font-bold text-gray-800">Upload a product photo</p>
                  <p className="mt-1 text-xs text-gray-500">Click to browse from your device</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#CDE7D0] bg-white px-3 py-2 text-xs font-semibold text-[#157A1A]">
                    <FaUpload /> Choose image
                  </span>
                </label>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
