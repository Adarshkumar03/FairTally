import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/api";
import { toast } from "react-toastify";
import UserNavbar from "./UserNavbar";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("User registered successfully!");
      navigate("/login");
    } catch (err) {
      setError("Error registering user");
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
            Register
          </h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#306B34]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full p-3 bg-white border rounded-md focus:outline-none ${
                error ? "border-red-500 focus:ring-red-500" : "border-gray-400 focus:ring-[#306B34]"
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              className="w-full bg-[#306B34] text-white py-2 rounded-md font-semibold hover:bg-[#245824] transition-all duration-300"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#306B34] cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
