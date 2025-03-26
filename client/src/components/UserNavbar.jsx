import { Link } from "react-router";
import useAuthStore from "../store/authStore";
import LogoutButton from "./LogoutButton";

const UserNavbar = () => {
    const user = useAuthStore.getState().user;
    const logoLink = user ? "/dashboard" : "/";

    return (
        <div className="w-full bg-[#AAD7B8] text-[#030303] p-4 flex justify-between items-center">
            {/* Logo - Conditional Link */}
            <Link to={logoLink} className="text-3xl font-extrabold hover:text-[#FFF6E5]">
                Splitwise
            </Link>

            {/* User Info & Actions */}
            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <span className="text-lg font-medium opacity-90">
                            Welcome, {user.name}
                        </span>
                        <LogoutButton />
                    </>
                ) : (
                    <div className="flex gap-4">
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
