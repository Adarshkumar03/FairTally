import useAuthStore from "../store/authStore";
import api from "./api";

export const checkSession = async () => {
    try {
        const response = await api.get("/auth/status");
        console.log("User session:", response.data);

        if (response.data.message === "Authenticated" && response.data.id && response.data.name) {
            useAuthStore.getState().login({ id: response.data.id, name: response.data.name });
            return { id: response.data.id, name: response.data.name };
        }
    } catch {
        return null;
    }
};