export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:7000"
    : "https://tkm-scrap-backend-7l2b.onrender.com");
