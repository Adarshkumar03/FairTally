import { Link } from "react-router";
import UserNavbar from "./UserNavbar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF6E5] via-[#F7C236] to-[#AAD7B8]">
      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-10 overflow-hidden">
        {/* Left Section */}
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-[#030C03]">Splitwise</h1>
          <p className="mt-4 text-lg text-[#030C03]">
            Easily split bills and track expenses with friends, family, and roommates.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 space-x-4">
            <Link
              to="/register"
              className="px-6 py-2 bg-[#306B34] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-white rounded-md shadow-md hover:bg-[#245824] transition duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-6 py-2 border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-[#030C03] rounded-lg shadow-md hover:bg-[#F7C236] transition duration-300"
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
