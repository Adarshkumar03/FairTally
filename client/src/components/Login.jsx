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
      const res = await api.post("/auth/login", { email, password });
      console.log("Login successful:", res.data);
      navigate("/dashboard");
      toast("Login Successful!!");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#AAD7B8] flex flex-col">
      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <div className="flex items-center justify-center flex-grow px-5">
        <div className="bg-[#FFF6E5] p-10 rounded-lg shadow-lg w-[450px]">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#030C03]">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#306B34]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#306B34]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="w-full bg-[#306B34] text-white py-2 rounded-md font-semibold hover:bg-[#245824] transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#306B34] cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
