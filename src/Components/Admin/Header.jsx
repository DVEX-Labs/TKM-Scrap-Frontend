const Header = ({ setSidebarOpen }) => {
  return (
    <header className="flex items-center px-4 py-3 bg-white border-b border-gray-100 shrink-0 lg:hidden">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="text-[#18931D] focus:outline-none"
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span className="ml-3 text-sm font-bold text-gray-900">Admin Panel</span>
    </header>
  );
};

export default Header;
