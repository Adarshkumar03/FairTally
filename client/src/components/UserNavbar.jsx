import { Link } from "react-router";
import useAuthStore from "../store/authStore";
import LogoutButton from "./LogoutButton";

const UserNavbar = () => {
    const user = useAuthStore.getState().user;

    return (
        <div className="w-full bg-[#AAD7B8] text-[#030303] p-4 flex justify-between items-center">
            {/* Logo */}
            <h1 className="text-2xl font-extrabold tracking-wide">Splitwise</h1>

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
                            className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 transition rounded-md"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 transition rounded-md"
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
