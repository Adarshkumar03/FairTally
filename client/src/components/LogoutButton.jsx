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
    <button onClick={handleLogout} className="bg">Logout</button>
  )
}

export default LogoutButton