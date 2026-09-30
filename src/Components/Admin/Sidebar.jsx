import { NavLink, useNavigate } from "react-router-dom";
import BrandLogo from "../BrandLogo";
import { FaBoxOpen, FaChartPie, FaPlusCircle, FaUsers, FaSignOutAlt } from "react-icons/fa";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 mx-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
    isActive
      ? "bg-[#18931D] text-white shadow-md shadow-green-900/20"
      : "text-gray-600 hover:bg-[#E8F5E9] hover:text-[#18931D]"
  }`;

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const closeOnMobile = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black/40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r-2 border-[#CDE7D0] shadow-[3px_0_14px_rgba(24,147,29,0.05)] flex flex-col transition duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-4 border-b border-gray-100">
          <BrandLogo
            imageClassName="h-10 w-auto"
            linkTo="/"
            className="w-full justify-center"
          />
          <p className="text-xs text-gray-500 font-medium text-center mt-2">Admin Panel</p>
        </div>

        <nav className="p-3 space-y-1 flex-1">
          <NavLink to="/admin" end className={linkClass} onClick={closeOnMobile}>
            <FaChartPie /> Dashboard
          </NavLink>
          <NavLink to="/admin/adminproduct" className={linkClass} onClick={closeOnMobile}>
            <FaBoxOpen /> All Scraps
          </NavLink>
          <NavLink to="/admin/add" className={linkClass} onClick={closeOnMobile}>
            <FaPlusCircle /> Add Scrap
          </NavLink>
          <NavLink to="/admin/users" className={linkClass} onClick={closeOnMobile}>
            <FaUsers /> Orders
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] py-3 px-4 rounded-xl font-bold transition-colors shadow-sm"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
