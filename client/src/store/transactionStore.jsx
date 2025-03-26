import { create } from "zustand";
import api from "../utils/api";

const useTransactionStore = create((set) => ({
    transactions: [],
    fetchGroupTransactions: async (groupId) => {
        if (!groupId) return;
        try {
            const { data } = await api.get(`/transactions/groups/${groupId}`);
            set({ transactions: data });
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    },
}));

export default useTransactionStore;
