import { useState } from "react";
import api from "../../utils/api";

const SettleExpenseModal = ({ groupId, onClose }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [transactions, setTransactions] = useState([]);

    // Fetch unsettled transactions when modal opens
    useState(() => {
        if (groupId) {
            api.get(`/transactions/group/${groupId}`)
                .then((res) => setTransactions(res.data.filter(txn => !txn.settled)))
                .catch((err) => console.error("Error fetching transactions:", err));
        }
    }, [groupId]);

    const handleSettle = async () => {
        if (!selectedTransaction) return;
        await api.put(`/transactions/${selectedTransaction}/settle`);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-lg font-semibold mb-4 text-center">Settle Expense</h2>

                <select
                    value={selectedTransaction || ""}
                    onChange={(e) => setSelectedTransaction(e.target.value)}
                    className="border p-2 w-full rounded-md"
                >
                    <option value="" disabled>Select a transaction</option>
                    {transactions.map((txn) => (
                        <option key={txn.id} value={txn.id}>
                            {txn.payerName} → {txn.payeeName} ({txn.amount})
                        </option>
                    ))}
                </select>

                <button 
                    onClick={handleSettle} 
                    className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full hover:bg-blue-600 transition"
                >
                    Settle
                </button>

                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default SettleExpenseModal;
