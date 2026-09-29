import { useState, useEffect } from "react";
import { FaTruckPickup } from "react-icons/fa";
import { BsFillTrash2Fill } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDoubleClick = () => {
    navigate('/admin');
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Scrap Rates", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <nav className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-2xl py-3 px-6' : 'bg-transparent py-2 px-2'}`}>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#18931D] rounded-xl flex items-center justify-center shadow-lg cursor-pointer" onDoubleClick={handleDoubleClick}>
              <BsFillTrash2Fill className="text-white text-xl" />
            </div>
            <h2 className="font-extrabold text-2xl tracking-tight cursor-pointer text-gray-900" onClick={() => navigate('/')}>
              ECO <span className="text-[#18931D]">SCRAP</span>
            </h2>
          </div>

          <ul className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm p-1.5 rounded-xl border border-gray-100 shadow-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all block ${
                      isActive 
                        ? "bg-[#18931D] text-white shadow-md" 
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center">
            <Link to="/contact">
              <button className="flex items-center gap-2 bg-[#141414] hover:bg-[#2B2B2B] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
                <FaTruckPickup className="text-lg" />
                Book Pickup
              </button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {dropdownOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {dropdownOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden md:hidden">
            <div className="flex flex-col p-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setDropdownOpen(false)}
                    className={`px-4 py-3 rounded-xl font-bold text-sm ${isActive ? 'bg-[#E8F5E9] text-[#18931D]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link to="/contact" onClick={() => setDropdownOpen(false)} className="mt-2 flex items-center justify-center gap-2 bg-[#141414] text-white px-4 py-3 rounded-xl font-bold text-sm">
                <FaTruckPickup /> Book Pickup
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
