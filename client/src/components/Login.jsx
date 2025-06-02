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

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      await api.post("/auth/login", { email, password });
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch{
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#AAD7B8]">
      <header>
        <UserNavbar />
      </header>

      <main className="flex flex-grow justify-center items-center px-4 py-12 bg-gradient-to-b from-[#AAD7B8] to-white">
        <section className="bg-white shadow-md rounded-xl w-full max-w-md p-8 sm:p-10 border border-[#CDE9DC]">
          <h2 className="text-3xl font-semibold text-center text-[#030303] mb-2 font-bebas">
            Hey! Welcome back,
          </h2>
          <p className="text-center text-[#306B34] font-medium mb-6">
            Track your expenses effortlessly and stay on top of your finances.
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-3">
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
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#69B99D] border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#69B99D] hover:bg-[#55a48a] text-white border-t-3 border-l-3 border-b-5 border-r-5 border-[#030303] font-bold py-3 rounded-md transition-all"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm mt-6 font-medium">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#306B34] hover:underline cursor-pointer font-semibold"
            >
              Register
            </span>
          </p>
        </section>
      </main>
    </div>
  );
}
