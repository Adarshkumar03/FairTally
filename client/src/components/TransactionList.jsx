import { useEffect, useState, useCallback } from "react";
import api from "../utils/api";
import useAuthStore from "../store/authStore";
import useTransactionStore from "../store/transactionStore";
import { toast } from "react-toastify";

const TransactionList = ({ groupId, refreshGroupDetails }) => {
    const { transactions, fetchGroupTransactions } = useTransactionStore();
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore(); // Get logged-in user

    // ✅ Memoizing fetch function to avoid re-renders
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
            fetchTransactions(); // ✅ Refresh after settling
            if (refreshGroupDetails) refreshGroupDetails(groupId);
            toast.success("Transaction settled!!");
        } catch (error) {
            console.error("Error settling transaction:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-400">Loading transactions...</p>;

    return (
        <div className="mt-4">
            {transactions.length > 0 ? (
                <ul className="space-y-4">
                    {transactions.map((tx) => {
                        const isUserInvolved = user?.id === tx.payerId || user?.id === tx.payeeId;

                        return (
                            <li key={tx.id} className="p-4 flex justify-between items-center bg-[#F6D47A] text-[#1F0600] rounded-md shadow-md border-t-2 border-l-2 border-b-4 border-r-4 border-[#000]">
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold">{tx.payerName} <span className="text-[#57bc4d]">paid</span> ₹{tx.amount} to {tx.payeeName}</span>
                                    <span className={`text-sm ${tx.settled ? "text-green-400" : "text-red-400"} font-medium`}>
                                        {tx.settled ? "Settled" : "Pending"}
                                    </span>
                                </div>
                                {!tx.settled && isUserInvolved && (
                                    <button
                                        onClick={() => handleSettleTransaction(tx.id)}
                                        className="bg-[#FCF5E5] text-black px-4 py-2 rounded-md text-sm font-semibold shadow-sm hover:brightness-110 transition"
                                    >
                                        Settle
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className=" text-center">No transactions yet</p>
            )}
        </div>
    );
};

export default TransactionList;
