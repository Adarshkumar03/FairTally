import { Link } from "react-router";
import UserNavbar from "./UserNavbar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 sm:px-10 overflow-hidden bg-gradient-to-b from-[#AAD7B8] via-[#CDC1FF] to-[#A594F9] pb-16">
        {/* Content Container */}
        <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-12 md:gap-x-24">
          {/* Left Section */}
          <article className="text-center md:text-left max-w-lg">
            <h1 className="text-5xl sm:text-6xl font-bebas tracking-wide font-extrabold text-[#030303] drop-shadow-md mb-6 leading-tight">
              Splitwise
            </h1>

            {/* Bullet Points */}
            <ul className="mt-4 text-lg text-[#1B1B1B] font-semibold space-y-4">
              <li className="flex items-center justify-center md:justify-start">
                <span className="text-[#306B34] text-3xl mr-3">✔</span>
                Easily split bills with friends and family.
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <span className="text-[#306B34] text-3xl mr-3">✔</span>
                Track expenses and settle debts instantly.
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <span className="text-[#306B34] text-3xl mr-3">✔</span>
                Organize group expenses effortlessly.
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
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
          </article>

          {/* Right Section (Image) - Hidden on small screens */}
          <figure className="flex justify-center md:block hidden">
            <img
              src="./image.png"
              alt="Expense Sharing"
              className="max-w-xs sm:max-w-sm md:max-w-lg"
            />
          </figure>
        </section>
      </main>
    </div>
  );
};

export default Home;
