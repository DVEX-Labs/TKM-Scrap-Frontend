import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../assets/image.png";
import { API_BASE_URL } from "../../config";
import OrderMonthCalendar, { toDateKey } from "../../Components/Admin/OrderMonthCalendar";
import OrdersTableSkeleton from "../../Components/Admin/OrdersTableSkeleton";
import { waitMinLoader } from "../../utils/loader";

function getTodayKey() {
  return toDateKey(new Date());
}

function getTomorrowKey() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return toDateKey(date);
}

function getDateLabel(dateKey) {
  if (dateKey === getTodayKey()) return "Today";
  if (dateKey === getTomorrowKey()) return "Tomorrow";
  return new Date(`${dateKey}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const UserList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayKey());
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const orderDateKeys = useMemo(() => {
    const keys = new Set();
    allOrders.forEach((order) => {
      if (order.createdAt) {
        keys.add(order.createdAt.slice(0, 10));
      }
    });
    return keys;
  }, [allOrders]);

  const filteredOrders = useMemo(
    () =>
      allOrders.filter(
        (order) => order.createdAt && order.createdAt.startsWith(selectedDate)
      ),
    [allOrders, selectedDate]
  );



  async function fetchUser() {
    const startTime = Date.now();
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/Users`);
      if (response.data?.userData) {
        setAllOrders(response.data.userData);
      }
    } catch (error) {
      console.log(error, "error in fetching user data from backend to frontend");
    } finally {
      await waitMinLoader(startTime);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function deleteDoc(id) {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/User/delete?id=${id}`);
      if (response.status === 200) {
        setAllOrders((prev) => prev.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log(error, "error in delete doc check into the delete btn");
    }
  }

  const downloadPDF = (user) => {
    const input = document.getElementById(`user-${user._id}`);
    if (!input) return;
    html2canvas(input).then(() => {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();

      const img = new Image();
      img.src = Logo;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 10, 10, 50, 20);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 128, 0);
        pdf.setFontSize(20);
        pdf.text("User Order Details", pdfWidth / 2, 40, { align: "center" });
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.text(`Name: ${user.full_name}`, 10, 60);
        pdf.text(`Phone: ${user.phone}`, 10, 70);
        pdf.text(`Location: ${user.address}`, 10, 80);
        pdf.text(`Country: ${user.country}`, 10, 90);
        pdf.text(`Date/Time: ${new Date(user.createdAt).toLocaleString()}`, 10, 100);

        pdf.save(`${user.full_name}_details.pdf`);
      };
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Pickup Orders</h2>
          <p className="text-sm text-gray-500">Manage pickup requests from users</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Filter Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              const picked = new Date(`${e.target.value}T00:00:00`);
              setCalendarMonth(new Date(picked.getFullYear(), picked.getMonth(), 1));
            }}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#18931D]/40"
          />
          <span className="text-sm font-semibold text-[#18931D]">{getDateLabel(selectedDate)}</span>
        </div>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse min-w-[980px]">
          <thead>
            <tr className="bg-[#F4FAF5] text-gray-600 text-xs uppercase tracking-wide">
              <th className="px-3 py-3 text-left font-semibold">Name</th>
              <th className="px-3 py-3 text-left font-semibold">Image</th>
              <th className="px-3 py-3 text-left font-semibold">Phone</th>
              <th className="px-3 py-3 text-left font-semibold">Address</th>
              <th className="px-3 py-3 text-left font-semibold">Location</th>
              <th className="px-3 py-3 text-left font-semibold">Pincode</th>
              <th className="px-3 py-3 text-left font-semibold">Message</th>
              <th className="px-3 py-3 text-left font-semibold">Date / Time</th>
              <th className="px-3 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={9} className="p-4">
                  <OrdersTableSkeleton />
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center">
                  <div className="text-4xl mb-2">📋</div>
                  <h3 className="text-base font-semibold text-gray-800">No orders found</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    No pickup requests for {getDateLabel(selectedDate).toLowerCase()}.
                  </p>
                </td>
              </tr>
            ) : (
              filteredOrders.map((user, index) => (
                <tr
                  key={user._id || index}
                  id={`user-${user._id}`}
                  className="hover:bg-gray-50/80 transition text-sm"
                >
                  <td className="px-3 py-3 font-medium text-gray-900">{user.full_name}</td>
                  <td className="px-3 py-3">
                    {user.pickupImage ? (
                      <img
                        src={`${API_BASE_URL}/assets/pickupImage/${user.pickupImage}`}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                        alt="Pickup"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-gray-600">{user.phone}</td>
                  <td className="px-3 py-3 text-gray-600 max-w-[160px] truncate">{user.address || "—"}</td>
                  <td className="px-3 py-3 text-gray-600 max-w-[140px] truncate">
                    {user.location || user.city || "—"}
                  </td>
                  <td className="px-3 py-3 text-gray-600">{user.zipcode || "—"}</td>
                  <td className="px-3 py-3 text-gray-600 max-w-[200px] truncate" title={user.message}>{user.message || "—"}</td>
                  <td className="px-3 py-3 text-gray-500 whitespace-nowrap">
                    {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-3 py-3 space-x-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => downloadPDF(user)}
                      className="bg-[#18931D] hover:bg-[#15801A] text-white text-xs px-3 py-1.5 rounded-lg transition"
                    >
                      PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteDoc(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
