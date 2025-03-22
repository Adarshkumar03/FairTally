import useAuthStore from "../store/authStore";
import api from "./api";

export const checkSession = async () => {
    try {
        const response = await api.get("/auth/status");

        if (response.data.message === "Authenticated") {
            useAuthStore.getState().login(response.data.name);
            return response.data.name;
        }
    } catch {
        return null;
    }
};