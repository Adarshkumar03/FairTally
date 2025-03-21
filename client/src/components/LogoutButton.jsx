import { useNavigate } from "react-router";
import api from "../utils/api"

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
        await api.post("/auth/logout");
        navigate("/login");
  }
  
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton