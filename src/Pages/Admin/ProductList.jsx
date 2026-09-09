import { useEffect, useState } from "react";
import ProductCard from "../../Components/Admin/ProductCard";
import axios from "axios";
import axiosInstance from "../../instance/AxiosInstance";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaBoxOpen, FaPlusCircle } from "react-icons/fa";
import { API_BASE_URL } from "../../config";

function ProductList() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  async function listProduct() {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/adminProduct");
      setProduct(response.data?.adminCard || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    listProduct();
  }, []);

  // product delete function
  const productdelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("delete here", id);
          const response = await axios.post(
            `${API_BASE_URL}/productdelete?id=${id}`
          );
          if (response.status === 200) {
            setProduct(product.filter((user) => user._id !== id));
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          } else {
            Swal.fire(
              "Error!",
              "There was an error deleting your product.",
              "error"
            );
          }
          console.log(response.status);
        } catch (error) {
          console.log(error, "error in product delete");
          Swal.fire(
            "Error!",
            "There was an error deleting your product.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
          <p className="text-sm text-gray-500">Manage scrap items and pricing</p>
        </div>
        <Link
          to="/admin/add"
          className="flex items-center px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium text-sm rounded-xl transition shadow-sm"
        >
          + Add New Product
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium animate-pulse">Loading products...</p>
        </div>
      ) : product.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl">
            📦
          </div>
          <h3 className="text-lg font-bold text-gray-700">No Products Available</h3>
          <p className="text-gray-500 max-w-sm mx-auto text-sm">
            You haven't added any products yet. Click the button below to add your first product.
          </p>
          <Link
            to="/admin/add"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition shadow-sm"
          >
            Add First Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.map((val) => (
            <ProductCard
              key={val._id}
              data={val}
              carddelete={productdelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
