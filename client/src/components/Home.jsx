import { Link } from "react-router";
import UserNavbar from "./UserNavbar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-10 overflow-hidden bg-gradient-to-b from-[#AAD7B8] via-[#CDC1FF] to-[#A594F9] pb-24">
        {/* Content Container with Increased Spacing */}
        <div className="flex items-center justify-between w-full max-w-5xl gap-x-24">
          {/* Left Section */}
          <div className="max-w-lg">
            <h1 className="text-5xl font-extrabold text-[#030303] drop-shadow-md mb-8 leading-tight">
              Splitwise
            </h1>

            {/* Bullet Points */}
            <ul className="mt-4 text-lg text-[#1B1B1B] font-semibold space-y-4">
              <li className="flex items-center">
                <span className="text-[#306B34] text-3xl mr-3">✔</span> 
                Easily split bills with friends and family.
              </li>
              <li className="flex items-center">
                <span className="text-[#306B34] text-3xl mr-3">✔</span> 
                Track expenses and settle debts instantly.
              </li>
              <li className="flex items-center">
                <span className="text-[#306B34] text-3xl mr-3">✔</span> 
                Organize group expenses effortlessly.
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="mt-10 flex space-x-6">
              <Link
                to="/register"
                className="px-7 py-3 bg-[#306B34] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-white rounded-md shadow-md text-lg font-semibold hover:bg-[#245824] transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-7 py-3 border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-[#030303] rounded-lg shadow-md text-lg font-semibold hover:bg-[#F7C236] transition duration-300"
              >
                Log In
              </Link>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="flex justify-center">
            <img src="./image.png" alt="Expense Sharing" className="max-w-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
