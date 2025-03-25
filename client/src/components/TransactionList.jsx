import { useEffect, useState } from "react";
import api from "../utils/api";
import useAuthStore from "../store/authStore"; // Assuming you have a Zustand store for auth
import { toast } from "react-toastify";

const TransactionList = ({ groupId, refreshGroupDetails }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore(); // Get logged-in user

    useEffect(() => {
        fetchGroupTransactions(groupId);
    }, [groupId]);

    const fetchGroupTransactions = async (groupId) => {
        try {
            const response = await api.get(`/transactions/groups/${groupId}`);
            console.log("Transactions:", response.data);
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
        setLoading(false);
    };

    const handleSettleTransaction = async (transactionId) => {
        try {
            await api.put(`/groups/transactions/${transactionId}/settle`);
            fetchGroupTransactions(groupId);
            if (refreshGroupDetails) {
                refreshGroupDetails(groupId);
            }
            toast("Transaction settled!!");
        } catch (error) {
            console.error("Error settling transaction:", error);
        }
    };

    if (loading) return <p className="text-center">Loading transactions...</p>;

    return (
        <div>
            {transactions.length > 0 ? (
                <ul className="space-y-3">
                    {transactions.map((tx) => {
                        const isUserInvolved = user?.id === tx.payerId || user?.id === tx.payeeId;

                        return (
                            <li key={tx.id} className="p-3 flex justify-between bg-[#121729] text-[#f9f9fa] rounded-md">
                                <span>
                                    <strong>{tx.payerName}</strong> paid <strong>₹{tx.amount}</strong> to <strong>{tx.payeeName}</strong>
                                </span>
                                <span className={tx.settled ? "text-green-500" : "text-red-500"}>
                                    {tx.settled ? "Settled" : "Pending"}
                                </span>
                                {!tx.settled && isUserInvolved && (
                                    <button
                                        onClick={() => handleSettleTransaction(tx.id)}
                                        className="bg-linear-65 from-[##202e5f] to-[#1e2a57] text-[#fbfbfb] px-3 py-1 rounded text-sm"
                                    >
                                        Settle
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-gray-500">No transactions yet</p>
            )}
        </div>
    );
};

export default TransactionList;
