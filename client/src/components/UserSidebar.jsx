
import useAuthStore from "../store/authStore";
import LogoutButton from "./LogoutButton";
const UserSidebar = ({ onAddExpense }) => {
    const user = useAuthStore.getState().user;
    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Welcome, {user}</h2>
            <LogoutButton/>
        </div>
    );
};

export default UserSidebar;
