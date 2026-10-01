import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaBoxOpen,
  FaEnvelope,
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

  return (
    <div className="space-y-3 lg:h-[calc(100dvh-2rem)] lg:overflow-hidden">
      <div className="relative overflow-hidden rounded-2xl bg-[#18931D] p-4 md:p-5 text-white shadow-[0_8px_24px_rgba(24,147,29,0.2)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-green-100 text-sm font-semibold uppercase tracking-wider mb-2">Admin Panel</p>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Admin</h1>
          <p className="text-green-50 mt-2 max-w-2xl text-sm">
            Manage scraps, pickup orders, and customer messages from one place.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
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
          hint="Customer inquiries"
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

      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
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

    </div>
  );
}

export default Dashbord;
