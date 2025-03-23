import useAuthStore from "../store/authStore";
import LogoutButton from "./LogoutButton";

const UserNavbar = () => {
    const user = useAuthStore.getState().user;

    return (
        <div className="w-full bg-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Splitwise</h1>
            <div className="flex items-center gap-4">
                <span>{user?.name}</span>
                <LogoutButton/>
            </div>
        </div>
    );
};

export default UserNavbar;