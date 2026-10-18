import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaImage, FaUpload, FaArrowLeft } from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import { PRODUCT_CATEGORIES } from "../../constants/productCategories";
import {
  getProductImageUrl,
  getCategoryFallback,
  handleProductImageError,
} from "../../utils/productImages";

const EditForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "Others",
    image: "",
  });
  const [newImageFile, setNewImageFile] = useState(null);
  const [newPreviewUrl, setNewPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!productId) {
      navigate("/admin/adminproduct");
      return;
    }

    setIsLoading(true);
    fetch(`${API_BASE_URL}/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct({
          title: data.title || "",
          price: data.price !== undefined ? data.price : "",
          category: data.category || "Others",
          image: data.Image || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        Swal.fire({
          icon: "error",
          title: "Not Found",
          text: "Could not find scrap item to edit.",
        }).then(() => navigate("/admin/adminproduct"));
      })
      .finally(() => setIsLoading(false));
  }, [productId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setNewPreviewUrl(objectUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Name",
        text: "Please enter the scrap name.",
      });
      return;
    }

    if (!product.price || Number(product.price) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing Price",
        text: "Please enter a valid price greater than ₹0.",
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", product.title.trim());
    formData.append("price", String(product.price));
    formData.append("category", product.category);

    if (newImageFile) {
      // Append both 'file' and 'image' to prevent field name mismatches
      formData.append("file", newImageFile);
      formData.append("image", newImageFile);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (data.success || response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Scrap updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/adminproduct");
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: data.message || "Failed to update scrap item.",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while updating.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#18931D] border-t-transparent" />
      </div>
    );
  }

  const currentDisplayImage =
    newPreviewUrl ||
    getProductImageUrl(product.image) ||
    getCategoryFallback(product.category);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        type="button"
        onClick={() => navigate("/admin/adminproduct")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#18931D] transition"
      >
        <FaArrowLeft /> Back to All Scraps
      </button>

      <div className="overflow-hidden rounded-2xl border border-[#DCE8DE] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
        <div className="border-b border-[#E5EDE6] px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">Edit Scrap Rate Card</h2>
          <p className="mt-1 text-sm text-gray-500">Update pricing, scrap name, category, or photo.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-7 p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-semibold text-gray-800">
                Scrap Name
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Scrap Name"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#18931D] focus:bg-white focus:ring-4 focus:ring-[#18931D]/10"
                value={product.title}
                onChange={handleChange}
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
                  value={product.category}
                  onChange={handleChange}
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
                    placeholder="Rate"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                    value={product.price}
                    onChange={handleChange}
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
              {isSubmitting ? "Updating Scrap..." : "Confirm Update Scrap"}
            </button>
          </div>

          <div className="flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Scrap Photo</label>
              <span className="text-xs text-gray-500">PNG, JPG, WEBP</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              name="image"
              id="file"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="relative flex min-h-[240px] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#CDE7D0] bg-[#F7FBF8] p-4 text-center">
              <img
                src={currentDisplayImage}
                alt={product.title || "Scrap item"}
                className="h-[180px] w-full object-contain rounded-lg"
                onError={(e) => handleProductImageError(e, product.category)}
              />
              <label
                htmlFor="file"
                className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#CDE7D0] bg-white px-3 py-1.5 text-xs font-semibold text-[#157A1A] hover:bg-[#E8F5E9] transition"
              >
                <FaUpload className="text-xs" />
                {newPreviewUrl ? "Change selected photo" : "Replace photo"}
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
