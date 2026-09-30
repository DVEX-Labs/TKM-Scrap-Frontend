import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaBoxOpen,
  FaClipboardList,
  FaEnvelope,
  FaPlusCircle,
  FaTrash,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import { waitMinLoader } from "../../utils/loader";
import OrderMonthCalendar, { toDateKey } from "../../Components/Admin/OrderMonthCalendar";

function StatCard({ label, value, hint, icon, iconBg, to }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] transition-all">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {hint && (
            to ? (
              <Link to={to} className="text-xs text-[#18931D] hover:underline mt-2 inline-block font-semibold">
                {hint}
              </Link>
            ) : (
              <span className="text-xs text-gray-400 mt-2 inline-block">{hint}</span>
            )
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function Dashbord() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const orderDateKeys = useMemo(() => {
    const keys = new Set();
    allOrders.forEach((order) => {
      if (order.createdAt) {
        keys.add(order.createdAt.slice(0, 10));
      }
    });
    return keys;
  }, [allOrders]);

  const selectedDateOrderCount = useMemo(
    () =>
      allOrders.filter(
        (order) => order.createdAt && order.createdAt.startsWith(selectedDate)
      ).length,
    [allOrders, selectedDate]
  );

  useEffect(() => {
    async function fetchDashboardData() {
      const startTime = Date.now();
      try {
        const [prodRes, userRes, contactRes] = await Promise.allSettled([
          axios.get(`${API_BASE_URL}/adminProduct`),
          axios.get(`${API_BASE_URL}/Users`),
          axios.get(`${API_BASE_URL}/admin/contacts`),
        ]);

        if (prodRes.status === "fulfilled" && prodRes.value.data?.adminCard) {
          setProductCount(prodRes.value.data.adminCard.length);
        }

        if (userRes.status === "fulfilled" && userRes.value.data?.userData) {
          const orders = userRes.value.data.userData;
          setAllOrders(orders);
          setOrderCount(orders.length);
        }

        if (contactRes.status === "fulfilled" && contactRes.value.data?.contactData) {
          const contacts = contactRes.value.data.contactData;
          setContactCount(contacts.length);
          setRecentContacts(contacts.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        await waitMinLoader(startTime);
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const handleDeleteContact = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/admin/contact/delete?id=${id}`);
      setRecentContacts((prev) => prev.filter((item) => item._id !== id));
      setContactCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-[#18931D] p-5 md:p-6 text-white shadow-[0_8px_24px_rgba(24,147,29,0.2)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-green-100 text-sm font-semibold uppercase tracking-wider mb-2">Admin Panel</p>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Admin</h1>
          <p className="text-green-50 mt-2 max-w-2xl text-sm">
            Manage scraps, pickup orders, and customer messages from one place.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Scraps"
          value={loading ? "..." : productCount}
          hint="View all scraps →"
          to="/admin/adminproduct"
          icon={<FaBoxOpen />}
          iconBg="bg-[#E8F5E9] text-[#18931D]"
        />
        <StatCard
          label="Pickup Orders"
          value={loading ? "..." : orderCount}
          hint="View all orders →"
          to="/admin/users"
          icon={<FaTruck />}
          iconBg="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Contact Messages"
          value={loading ? "..." : contactCount}
          hint="Latest inquiries below"
          icon={<FaEnvelope />}
          iconBg="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Active Customers"
          value={loading ? "..." : orderCount}
          hint="Registered pickup users"
          icon={<FaUsers />}
          iconBg="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Pickup Calendar</h2>
            <p className="text-xs text-gray-500">Green dots show dates with pickup orders</p>
          </div>
          <p className="text-sm font-semibold text-[#18931D]">
            {selectedDateOrderCount} order{selectedDateOrderCount === 1 ? "" : "s"} on selected date
          </p>
        </div>
        <OrderMonthCalendar
          monthDate={calendarMonth}
          selectedDate={selectedDate}
          orderDateKeys={orderDateKeys}
          onSelectDate={setSelectedDate}
          onPrevMonth={() =>
            setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
          }
          onNextMonth={() =>
            setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
          }
        />
        <div className="mt-3 text-right">
          <Link to="/admin/users" className="text-sm font-semibold text-[#18931D] hover:underline">
            Open full orders page →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-1 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link
              to="/admin/add"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#18931D] hover:bg-[#15801A] text-white rounded-xl font-semibold transition-colors"
            >
              <FaPlusCircle /> Add Scrap
            </Link>
            <Link
              to="/admin/adminproduct"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F4FAF5] hover:bg-[#E8F5E9] text-gray-800 rounded-xl font-semibold transition-colors"
            >
              <FaBoxOpen /> Manage Scraps
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F4FAF5] hover:bg-[#E8F5E9] text-gray-800 rounded-xl font-semibold transition-colors"
            >
              <FaClipboardList /> Manage Pickup Orders
            </Link>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Contact Messages</h2>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Includes address details</span>
          </div>

          {recentContacts.length === 0 ? (
            <p className="text-gray-500 py-8 text-center text-sm">No contact messages yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[720px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase">
                    <th className="py-3 pr-4">Name</th>
                    <th className="py-3 pr-4">Phone</th>
                    <th className="py-3 pr-4">Address</th>
                    <th className="py-3 pr-4">Location</th>
                    <th className="py-3 pr-4">Pincode</th>
                    <th className="py-3 pr-4">Email</th>
                    <th className="py-3 pr-4">Message</th>
                    <th className="py-3 pr-4">Date</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {recentContacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50/80 transition">
                      <td className="py-3 pr-4 font-medium text-gray-900">{contact.name}</td>
                      <td className="py-3 pr-4 text-gray-600">+91 {contact.phone}</td>
                      <td className="py-3 pr-4 text-gray-600 max-w-[120px] truncate">{contact.address || "—"}</td>
                      <td className="py-3 pr-4 text-gray-600 max-w-[120px] truncate">{contact.location || "—"}</td>
                      <td className="py-3 pr-4 text-gray-600">{contact.pincode || "—"}</td>
                      <td className="py-3 pr-4 text-gray-600">{contact.email || "—"}</td>
                      <td className="py-3 pr-4 text-gray-600 max-w-xs truncate">{contact.message || "—"}</td>
                      <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">
                        {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-3">
                        <button
                          type="button"
                          onClick={() => handleDeleteContact(contact._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete contact message"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
