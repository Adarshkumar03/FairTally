import { create } from "zustand";
import api from "../utils/api";

const useTransactionStore = create((set) => ({
    groupTransactions: [],
    friendTransactions: [],
    groupDetails: null,
    friendDetails: null,

    fetchGroupTransactions: async (groupId) => {
        if (!groupId) return;
        try {
            const { data } = await api.get(`/transactions/groups/${groupId}`);
            set({ groupTransactions: data });
        } catch (error) {
            console.error("Error fetching group transactions:", error);
        }
    },

    fetchGroupDetails: async (groupId) => {
        if (!groupId) return;
        try {
            const response = await api.get(`/groups/${groupId}`);
            set({ groupDetails: null });
            setTimeout(() => set({ groupDetails: response.data }), 0);
        } catch (error) {
            console.error("Error fetching group details:", error);
        }
    },

    fetchFriendTransactions: async (friendId) => {
        if (!friendId) return;
        try {
            const response = await api.get(`/friends/${friendId}/transactions`);
            set({ friendTransactions: response.data });
        } catch (error) {
            console.error("Error fetching friend expenses:", error);
        }
    },
}));

export default useTransactionStore;
