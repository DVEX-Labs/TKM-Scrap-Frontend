import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaImage, FaUpload } from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import { PRODUCT_CATEGORIES } from "../../constants/productCategories";

const DRAFT_KEY = "tkm-scraps-add-draft";
const PREVIEW_KEY = "tkm-scraps-add-image-preview";

const CardForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Others",
    file: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setFormData((prev) => ({
          ...prev,
          title: parsed.title || "",
          price: parsed.price || "",
          category: parsed.category || "Others",
        }));
      }
      const savedPreview = sessionStorage.getItem(PREVIEW_KEY);
      if (savedPreview) {
        setPreviewUrl(savedPreview);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files?.[0];
      if (!file) return;

      setFormData({ ...formData, file });
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          sessionStorage.setItem(PREVIEW_KEY, reader.result);
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    setFormData({ ...formData, [name]: value });
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
  };

  const handleSubmitting = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.price || !formData.file) {
      Swal.fire({
        icon: "warning",
        title: "Missing details",
        text: "Please add scrap name, price, and image before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("file", formData.file);
      formDataObj.append("title", formData.title.trim());
      formDataObj.append("price", formData.price);
      formDataObj.append("category", formData.category);

      const response = await axios.post(`${API_BASE_URL}/card`, formDataObj);
      if (response.data) {
        clearDraft();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Scrap added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
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
                placeholder="Enter scrap name"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#18931D] focus:bg-white focus:ring-4 focus:ring-[#18931D]/10"
                value={formData.title}
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
                  min="0"
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                  value={formData.price}
                />
              </div>
            </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#18931D] py-3.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(24,147,29,0.22)] transition hover:bg-[#15801A] disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Confirm Add Scrap"}
            </button>
          </div>

          <div className="flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Product Image</label>
              <span className="text-xs text-gray-500">PNG, JPG, WEBP</span>
            </div>
            <input
              type="file"
              name="file"
              id="file"
              className="sr-only"
              onChange={handleChange}
              accept="image/*"
            />
            <label
              htmlFor="file"
              className="group relative flex min-h-[260px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#CDE7D0] bg-[#F7FBF8] p-4 text-center transition hover:border-[#18931D] hover:bg-[#F2FAF3]"
            >
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Scrap preview" className="h-[250px] w-full object-contain" />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gray-900/85 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">Change image</span>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-[#18931D] shadow-sm"><FaImage /></span>
                  <p className="text-sm font-bold text-gray-800">Upload a product photo</p>
                  <p className="mt-1 text-xs text-gray-500">Click to browse from your device</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#CDE7D0] bg-white px-3 py-2 text-xs font-semibold text-[#157A1A]"><FaUpload /> Choose image</span>
                </div>
              )}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
