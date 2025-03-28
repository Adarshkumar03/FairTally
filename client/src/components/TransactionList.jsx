import { useEffect, useState, useCallback } from "react";
import api from "../utils/api";
import useAuthStore from "../store/authStore";
import useTransactionStore from "../store/transactionStore";
import { toast } from "react-toastify";
import TransactionComponent from "./TransactionComponent";

const TransactionList = ({ groupId, refreshGroupDetails }) => {
    const { transactions, fetchGroupTransactions } = useTransactionStore();
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();

    const fetchTransactions = useCallback(() => {
        setLoading(true);
        fetchGroupTransactions(groupId).finally(() => setLoading(false));
    }, [groupId, fetchGroupTransactions]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handleSettleTransaction = async (transactionId) => {
        try {
            await api.put(`/groups/transactions/${transactionId}/settle`);
            fetchTransactions();
            if (refreshGroupDetails) refreshGroupDetails(groupId);
            toast.success("Transaction settled!!");
        } catch (error) {
            console.error("Error settling transaction:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-400">Loading transactions...</p>;

    return (
        <TransactionComponent transactions={transactions} loading={loading} user={user} onSettle={handleSettleTransaction} />
    );
};

export default TransactionList;
