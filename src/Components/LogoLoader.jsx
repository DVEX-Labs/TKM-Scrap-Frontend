import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/ecoscrap-logo-transparent.png";

function LogoLoader() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 3000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F4FAF5]" role="status" aria-label="Loading page">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#CDE7D0] border-t-[#18931D] animate-spin">
        <img src={logo} alt="Eco Scrap" className="h-12 w-auto animate-pulse" />
      </div>
      <p className="mt-5 text-sm font-semibold text-[#18931D]">Loading...</p>
    </div>
  );
}

export default LogoLoader;
