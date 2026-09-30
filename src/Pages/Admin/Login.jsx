import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import BrandLogo from "../../Components/BrandLogo";
import { FaUser, FaLock, FaSignInAlt, FaCircleNotch, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(`${API_BASE_URL}/AdminLogin`, values);
      localStorage.setItem("token", response.data.token);
      navigate("/admin");
    } catch (err) {
      console.error("There was an error!", err);
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-[#F8FAFC] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-[0.03] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] rounded-full bg-[#18931D] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex justify-center mb-8">
              <BrandLogo imageClassName="h-14 w-auto" />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2">
              Admin Portal
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8 font-medium">
              Securely access the TKM Scraps dashboard
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="username"
                    required
                    placeholder="Enter your username"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18931D]/30 focus:border-[#18931D] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18931D]/30 focus:border-[#18931D] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex="-1"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#18931D] hover:bg-[#15801A] text-white py-3.5 rounded-xl font-bold shadow-[0_4px_14px_rgba(24,147,29,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(24,147,29,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none mt-2"
              >
                {loading ? (
                  <FaCircleNotch className="animate-spin text-lg" />
                ) : (
                  <>
                    <FaSignInAlt />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Restricted Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
