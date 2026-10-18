import React, { useEffect, useState } from "react";
import logo from "../assets/tkm-logo-horizontal.png";

function LogoLoader() {
  const [visible, setVisible] = useState(() => {
    try {
      // Only show splash screen once per browsing session
      return !sessionStorage.getItem("tkm_splash_shown");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;

    // Quick, subtle 600ms splash only on first open
    const timer = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("tkm_splash_shown", "true");
      } catch {
        // ignore storage errors
      }
    }, 600);

    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-300"
      role="status"
      aria-label="Loading page"
    >
      <div className="relative flex h-20 w-56 items-center justify-center">
        <img src={logo} alt="TKM Scraps" className="h-full w-full object-contain animate-pulse" />
      </div>
      <p className="mt-5 text-xs font-bold tracking-[0.2em] uppercase text-[#18931D]">
        TKM SCRAPS
      </p>
    </div>
  );
}

export default LogoLoader;
