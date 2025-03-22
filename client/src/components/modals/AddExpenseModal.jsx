import { useState } from "react";
import api from "../../utils/api";

const AddExpenseModal = ({ onClose }) => {
    const [amount, setAmount] = useState("");
    const [groupId, setGroupId] = useState("");
    const [sharedWith, setSharedWith] = useState([]);

    const handleSubmit = async () => {
        if (!amount || !groupId) return;
        await api.post("/expenses", { amount, groupId, sharedWith });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-lg font-semibold mb-4 text-center">Add Expense</h2>

                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="Amount" 
                    className="border p-2 w-full rounded-md"
                />

                <button 
                    onClick={handleSubmit} 
                    className="bg-green-500 text-white p-2 rounded-md mt-4 w-full hover:bg-green-600 transition"
                >
                    Add Expense
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

export default AddExpenseModal;
