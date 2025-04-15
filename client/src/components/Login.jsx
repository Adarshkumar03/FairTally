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
      navigate("/dashboard");
      toast.success("Login Successful!!");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <UserNavbar />
      </header>

      <main className="flex items-center justify-center flex-grow px-5 bg-gradient-to-b from-[#AAD7B8] via-[#F7C236] to-[#306B34]">
        <section className="bg-[#F7C236] border-l-2 border-t-2 border-r-5 border-b-5 border-[#030303] p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-md sm:w-96 md:w-[28rem]">
          <h2 className="text-4xl font-bold text-center mb-6 text-[#030303] font-bebas tracking-wider">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <article>
              <label className="block text-[#030C03] font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full p-3 bg-white border rounded-md focus:outline-none ${
                  error.includes("email") ? "border-red-500 focus:ring-red-500" : "border-gray-400 focus:ring-[#306B34]"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </article>

            <article>
              <label className="block text-[#030C03] font-semibold mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full p-3 bg-white border rounded-md focus:outline-none ${
                  error.includes("Password") ? "border-red-500 focus:ring-red-500" : "border-gray-400 focus:ring-[#306B34]"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </article>

            <button className="w-full bg-[#306B34] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-white py-2 rounded-md font-semibold hover:bg-[#245824] transition-all duration-300">
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4 font-medium">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#306B34] cursor-pointer hover:underline font-semibold"
            >
              Register
            </span>
          </p>
        </section>
      </main>
    </div>
  );
}
