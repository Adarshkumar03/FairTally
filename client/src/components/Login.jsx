import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import api from "../utils/api";
import UserNavbar from "./UserNavbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", { email, password });
      navigate("/dashboard");
      toast.success("Login Successful!!");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <div className="flex items-center justify-center flex-grow px-5 bg-gradient-to-b from-[#AAD7B8] via-[#F7C236] to-[#306B34]">
        <div className="bg-[#F7C236] border-l-2 border-t-2 border-r-5 border-b-5 border-[#030303] p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-md sm:w-96 md:w-[28rem]">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#030303]">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-[#030C03] font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#306B34]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[#030C03] font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#306B34]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-[#306B34] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-white py-2 rounded-md font-semibold hover:bg-[#245824] transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#306B34] cursor-pointer hover:underline font-semibold"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
