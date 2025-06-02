import { Link, useLocation } from "react-router";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import useAuthStore from "../store/authStore";
import LogoutButton from "./LogoutButton";

const UserNavbar = () => {
  const user = useAuthStore.getState().user;
  const logoLink = user ? "/dashboard" : "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthRoute = ["/", "/login", "/register"].includes(location.pathname);
  return (
    <header
      className={`w-full bg-[#AAD7B8] text-[#030303] flex justify-between items-center px-10 
  ${
    isAuthRoute
      ? "md:static fixed top-0 left-0 right-0 z-50"
      : "fixed top-0 left-0 right-0 z-50"
  }`}
    >
      <Link
        to={logoLink}
        className="text-[#fff6e5] bg-[#030303] text-3xl hover:text-[#030303] hover:bg-[#fff6e5] transition-all duration-500 font-bebas px-3 py-3 tracking-wide"
      >
        FairTally
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-xl  font-semibold opacity-90">
              Welcome,{" "}
              <span className="text-[#fff6e5] font-bold">{user.name}</span>
            </span>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold bg-[#69B99D] text-white rounded-lg border-t-2 border-l-2 border-b-4 border-r-4 border-[#030303] hover:bg-[#55a48a] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold bg-[#306B34] text-white rounded-lg border-t-2 border-l-2 border-b-4 border-r-4 border-[#030303] hover:bg-[#245824] transition"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      <button
        className="md:hidden text-3xl text-[#030303]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <IoClose /> : <IoMenu />}
      </button>

      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-[#AAD7B8] text-center flex flex-col items-center gap-4 py-6 shadow-lg z-[100] md:hidden">
          {user ? (
            <>
              <span className="text-lg font-medium opacity-90">
                Welcome,{" "}
                <span className="text-[#fff6e5] font-bold">{user.name}</span>
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-3 text-lg font-semibold bg-[#69B99D] text-white rounded-lg border-t-2 border-l-2 border-b-4 border-r-4 border-[#030303] hover:bg-[#55a48a] transition w-3/4 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 text-lg font-semibold bg-[#306B34] text-white rounded-lg border-t-2 border-l-2 border-b-4 border-r-4 border-[#030303] hover:bg-[#245824] transition w-3/4 text-center"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default UserNavbar;
