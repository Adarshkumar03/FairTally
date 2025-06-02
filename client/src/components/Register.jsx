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

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!nameRegex.test(name)) {
      setError(
        "Name must be 2-50 characters and contain only letters and spaces."
      );
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("User registered successfully!");
      navigate("/login");
    } catch {
      setError("Error registering user. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#AAD7B8]">
      <header>
        <UserNavbar />
      </header>

      <main className="flex flex-grow justify-center items-start pt-28 sm:pt-6 px-3 sm:px-4 py-6 bg-gradient-to-b from-[#AAD7B8] to-white">
        <section className="bg-white shadow-md rounded-xl w-full max-w-md p-6 sm:p-10 border border-[#CDE9DC] mt-0 sm:mt-4">
          <h2 className="text-3xl font-semibold text-center text-[#030303] mb-6 font-bebas">
            Create Your Account
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-[#030C03] font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#69B99D] border-gray-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[#030C03] font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. abc@company.com"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#69B99D] border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[#030C03] font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#69B99D] border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[#030C03] font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#69B99D] border-gray-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#69B99D] hover:bg-[#55a48a] text-white border-t-3 border-l-3 border-b-5 border-r-5 border-[#030303] font-bold py-3 rounded-md transition-all"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-6 font-medium">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#306B34] hover:underline cursor-pointer font-semibold"
            >
              Log in
            </span>
          </p>
        </section>
      </main>
    </div>
  );
}
