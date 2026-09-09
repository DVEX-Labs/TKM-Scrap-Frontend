import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaBoxOpen, FaClipboardList, FaPlusCircle, FaUsers } from "react-icons/fa";

function Dashbord() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const prodRes = await axios.get("http://localhost:7000/adminProduct");
        if (prodRes.data && prodRes.data.adminCard) {
          setProductCount(prodRes.data.adminCard.length);
        }
      } catch (err) {
        console.error("Error fetching product count:", err);
      }

      try {
        const userRes = await axios.get("http://localhost:7000/Users");
        if (userRes.data && userRes.data.userData) {
          setUserCount(userRes.data.userData.length);
          setRecentOrders(userRes.data.userData.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching user orders count:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome back, Admin! 👋</h1>
        <p className="text-green-100 mt-1">
          Here is what is happening with Eco Scrap operations today.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{loading ? "..." : productCount}</p>
            <Link to="/admin/adminproduct" className="text-xs text-green-600 hover:underline mt-2 inline-block font-medium">
              View all products →
            </Link>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-2xl">
            <FaBoxOpen />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pickup Orders</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{loading ? "..." : userCount}</p>
            <Link to="/admin/users" className="text-xs text-green-600 hover:underline mt-2 inline-block font-medium">
              View all orders →
            </Link>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl">
            <FaClipboardList />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Customers</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{loading ? "..." : userCount}</p>
            <span className="text-xs text-gray-400 mt-2 inline-block">Registered users</span>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 text-2xl">
            <FaUsers />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">System Status</p>
            <p className="text-xl font-bold text-green-600 mt-1">Operational</p>
            <span className="text-xs text-gray-400 mt-2 inline-block">Backend Port: 7000</span>
          </div>
          <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 text-2xl">
            <FaPlusCircle />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/add"
            className="flex items-center px-4 py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition shadow-sm"
          >
            <FaPlusCircle className="mr-2" /> Add New Product
          </Link>
          <Link
            to="/admin/adminproduct"
            className="flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            <FaBoxOpen className="mr-2" /> Manage Products
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            <FaClipboardList className="mr-2" /> Manage Pickup Orders
          </Link>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Pickup Requests</h2>
          <Link to="/admin/users" className="text-sm text-green-600 hover:underline font-medium">
            View All
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500 py-4 text-center">No recent pickup requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {recentOrders.map((order, index) => (
                  <tr key={order._id || index} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-medium text-gray-800">{order.full_name}</td>
                    <td className="py-3 px-4 text-gray-600">{order.phone}</td>
                    <td className="py-3 px-4 text-gray-600">{order.address}, {order.city}</td>
                    <td className="py-3 px-4 text-gray-500">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashbord;
