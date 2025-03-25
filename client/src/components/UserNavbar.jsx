import useAuthStore from "../store/authStore";
import LogoutButton from "./LogoutButton";

const UserNavbar = () => {
    const user = useAuthStore.getState().user;

    return (
        <div className="w-full text-[#fbfbfc] bg-[#070d2d] p-3 flex justify-between items-center px-5">
            <h1 className="text-2xl font-bold">Splitwise</h1>
            <div className="flex items-center gap-4 text-lg font-semibold">
                <span>Welcome, {user?.name}</span>
                <LogoutButton/>
            </div>
        </div>
    );
};

export default UserNavbar;