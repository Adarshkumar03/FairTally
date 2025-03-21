import api from "./api";

export const checkSession = async () => {
    try{
        const response = await api.get("/auth/status");
        return response.data.user;
    }catch{
        return null;
    }
}