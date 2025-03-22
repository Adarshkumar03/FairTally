import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import TransactionHistory from "./TransactionHistory";
import api from "../utils/api";

const GroupDashboard = () => {
    const { selectedGroup, setUserModalOpen, setSettleModalOpen } = useOutletContext();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (selectedGroup) {
            fetchTransactions();
        }
    }, [selectedGroup]);

    const fetchTransactions = async () => {
        try {
            const response = await api.get(`/transactions/group/${selectedGroup.id}`);
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!selectedGroup) {
        return <p>No group selected</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold">{selectedGroup.name}</h2>

            {/* Buttons for Actions */}
            <div className="flex gap-4 mt-4">
                <button 
                    onClick={() => setUserModalOpen(true)} 
                    className="bg-green-500 text-white p-2 rounded-md"
                >
                    Add User
                </button>
                <button 
                    onClick={() => setSettleModalOpen(true)} 
                    className="bg-blue-500 text-white p-2 rounded-md"
                >
                    Settle Expenses
                </button>
            </div>

            {/* Transaction History */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Group Transactions</h3>
                {loading ? <p>Loading transactions...</p> : <TransactionHistory transactions={transactions} />}
            </div>
        </div>
    );
};

export default GroupDashboard;
