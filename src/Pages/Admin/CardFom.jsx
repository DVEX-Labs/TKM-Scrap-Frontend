import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config";
import { PRODUCT_CATEGORIES } from "../../constants/productCategories";

const DRAFT_KEY = "eco-scrap-add-draft";
const PREVIEW_KEY = "eco-scrap-add-image-preview";

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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add Scrap</h2>
          <p className="text-xs text-gray-500 mt-0.5">Draft auto-saves while you type.</p>
        </div>

        <form onSubmit={handleSubmitting} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label htmlFor="title" className="mb-1 block text-xs font-semibold text-gray-700">
                Scrap Name
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                placeholder="Enter scrap name"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 text-sm outline-none focus:border-[#18931D] focus:ring-2 focus:ring-[#18931D]/20"
                value={formData.title}
              />
            </div>

            <div>
              <label htmlFor="category" className="mb-1 block text-xs font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                value={formData.category}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 text-sm outline-none focus:border-[#18931D] focus:ring-2 focus:ring-[#18931D]/20"
              >
                {PRODUCT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="price" className="mb-1 block text-xs font-semibold text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                onChange={handleChange}
                placeholder="Enter scrap price"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 text-sm outline-none focus:border-[#18931D] focus:ring-2 focus:ring-[#18931D]/20"
                value={formData.price}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#18931D] hover:bg-[#15801A] disabled:opacity-70 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              {isSubmitting ? "Saving..." : "Confirm Add Scrap"}
            </button>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Upload Image</label>
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
              className="relative flex h-[220px] lg:h-full min-h-[180px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-[#F9FBF9] p-3 text-center cursor-pointer hover:border-[#18931D] transition-colors overflow-hidden"
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Scrap preview" className="max-h-full w-full object-contain rounded-md" />
              ) : (
                <div>
                  <p className="text-sm font-semibold text-gray-800">Drop image here</p>
                  <p className="text-xs text-gray-500 mt-1">or click to browse</p>
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
