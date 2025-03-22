import useAuthStore from "../store/authStore";
import api from "./api";

export const checkSession = async () => {
    try {
        const response = await api.get("/auth/status");
        console.log(response.data);

        if (response.data.message === "Authenticated") {
            useAuthStore.getState().login(response.data.name);
            console.log("User from authStore: ", useAuthStore.getState().user);
            return response.data.name;
        }
    } catch {
        return null;
    }
};