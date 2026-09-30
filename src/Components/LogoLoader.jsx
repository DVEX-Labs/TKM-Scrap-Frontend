import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/tkm-logo-horizontal.png";

function LogoLoader() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white" role="status" aria-label="Loading page">
      <div className="relative flex h-24 w-64 items-center justify-center animate-bounce" style={{ animationDuration: '2s' }}>
        <img src={logo} alt="TKM Scraps" className="h-full w-full object-contain" />
      </div>
      <p className="mt-8 text-sm font-extrabold tracking-[0.2em] uppercase text-[#18931D] animate-pulse">Loading...</p>
    </div>
  );
}

export default LogoLoader;
