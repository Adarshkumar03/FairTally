import { Link } from "react-router";
import UserNavbar from "./UserNavbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#909CC2]">
      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <div className="flex items-center justify-center h-[calc(100vh-64px)] px-10">
        {/* Left Section */}
        <div className="w-1/2">
          <h1 className="text-5xl font-bold text-[#030C03]">Splitwise</h1>
          <p className="mt-4 text-lg text-[#030C03]">
            Easily split bills and track expenses with friends, family, and roommates.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 space-x-4">
            <Link
              to="/register"
              className="px-6 py-2 bg-[#306B34] text-white rounded-lg shadow-md hover:bg-[#245824] transition duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-6 py-2 border-2 border-[#030C03] text-[#030C03] rounded-lg shadow-md hover:bg-[#F7C236] transition duration-300"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="flex justify-center">
          <img src="./6617.jpg" alt="Expense Sharing" className="max-w-md rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
