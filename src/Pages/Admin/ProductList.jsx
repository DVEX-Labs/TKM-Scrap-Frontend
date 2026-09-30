import { useEffect, useState } from "react";
import ProductCard from "../../Components/Admin/ProductCard";
import axios from "axios";
import axiosInstance from "../../instance/AxiosInstance";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import ScrapCardSkeleton from "../../Components/Admin/ScrapCardSkeleton";
import { waitMinLoader } from "../../utils/loader";

function ProductList() {
  const [scraps, setScraps] = useState([]);
  const [loading, setLoading] = useState(true);

  async function listScraps() {
    const startTime = Date.now();
    try {
      setLoading(true);
      const response = await axiosInstance.get("/adminProduct");
      setScraps(response.data?.adminCard || []);
    } catch (error) {
      console.error("Error fetching scraps:", error);
    } finally {
      await waitMinLoader(startTime);
      setLoading(false);
    }
  }

  useEffect(() => {
    listScraps();
  }, []);

  const scrapDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#18931D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${API_BASE_URL}/productdelete?id=${id}`);
          if (response.status === 200) {
            setScraps(scraps.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Your scrap item has been deleted.", "success");
          } else {
            Swal.fire("Error!", "There was an error deleting your scrap item.", "error");
          }
        } catch (error) {
          console.log(error, "error in scrap delete");
          Swal.fire("Error!", "There was an error deleting your scrap item.", "error");
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">All Scraps</h2>
          <p className="text-sm text-gray-500">Manage scrap items and pricing</p>
        </div>
        <Link
          to="/admin/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#18931D] hover:bg-[#15801A] text-white font-semibold text-sm rounded-xl transition shadow-sm"
        >
          <FaPlusCircle /> Add Scrap
        </Link>
      </div>

      {loading ? (
        <ScrapCardSkeleton />
      ) : scraps.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl space-y-3">
          <div className="text-4xl">📦</div>
          <h3 className="text-lg font-semibold text-gray-800">No scraps available</h3>
          <p className="text-gray-500 text-sm">Add your first scrap item to show rates on the website.</p>
          <Link
            to="/admin/add"
            className="inline-flex items-center gap-2 bg-[#18931D] hover:bg-[#15801A] text-white font-semibold py-2.5 px-5 rounded-xl transition"
          >
            Add First Scrap
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {scraps.map((val) => (
            <ProductCard key={val._id} data={val} carddelete={scrapDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
