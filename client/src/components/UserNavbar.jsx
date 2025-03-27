import { Link } from "react-router";
import useAuthStore from "../store/authStore";
import LogoutButton from "./LogoutButton";

const UserNavbar = () => {
    const user = useAuthStore.getState().user;
    const logoLink = user ? "/dashboard" : "/";

    return (
        <div className="w-full bg-[#AAD7B8] text-[#030303] flex justify-between items-center px-10">
            {/* Logo - Conditional Link */}
            <Link to={logoLink} className="text-[#fff6e5] bg-[#030303] text-3xl hover:text-[#030303] hover:bg-[#fff6e5] transition-all duration-500 font-bebas m-0 px-4 py-2">
                Splitwise
            </Link>

            {/* User Info & Actions */}
            <div className="flex items-center gap-6">
                {user ? (
                    <div>
                        <span className="text-lg font-medium opacity-90 mr-2.5">
                            Welcome, <span className="text-[#fff6e5] font-bold">{user.name}</span>
                        </span>
                        <LogoutButton />
                    </div>
                ) : (
                    <div className="flex gap-4 ">
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-semibold bg-[#F7C236] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-[#030C03] hover:bg-[#e0ae2b] transition rounded-md"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 text-sm font-semibold bg-[#306B34] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-white hover:bg-[#245824] transition rounded-md"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserNavbar;
