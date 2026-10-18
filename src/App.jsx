import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import AdminRouter from "./Router/AdminRouter";
import UserRouter from "./Router/UserRouter";
import LogoLoader from "./Components/LogoLoader.jsx";
import { API_BASE_URL } from "./config";

function AppRoutes() {
  useEffect(() => {
    // Silently warm up backend in background and cache products
    axios.get(`${API_BASE_URL}/healthz`, { timeout: 10000 }).catch(() => {});
    axios
      .get(`${API_BASE_URL}/Products`, { timeout: 35000 })
      .then((res) => {
        if (Array.isArray(res.data?.carddetails) && res.data.carddetails.length > 0) {
          try {
            localStorage.setItem("tkm_cached_products", JSON.stringify(res.data.carddetails));
          } catch {
            // ignore storage quota error
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <LogoLoader />
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
