import { useNavigate } from "react-router";
import api from "../utils/api"
import useAuthStore from "../store/authStore";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
        await api.post("/auth/logout");
        useAuthStore.getState().logout();
        navigate("/login");
  }
  
  return (
    <button onClick={handleLogout} className="bg-linear-65 from-[#9920e3] to-[#2f1b80] text-[#fbfbfb] p-2 rounded-md font-semibold">Logout</button>
  )
}

export default LogoutButton