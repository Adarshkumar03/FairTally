import { useState } from "react";
import useAuthStore from "../../store/authStore";
import api from "../../utils/api";

const AddExpenseModal = ({ groupId, groupName, groupMembers, onClose }) => {
    const { user } = useAuthStore();
    const [amount, setAmount] = useState("");
    const [sharedWith, setSharedWith] = useState(groupMembers.map((member) => member.id)); 
    const [perPersonAmount, setPerPersonAmount] = useState(0);

    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
        setPerPersonAmount(newAmount && sharedWith.length > 0 ? parseFloat(newAmount) / sharedWith.length : 0);
    };

    const handleUserSelect = (userId) => {
        const updatedSharedWith = sharedWith.includes(userId)
            ? sharedWith.filter((id) => id !== userId)
            : [...sharedWith, userId];

        setSharedWith(updatedSharedWith);
        setPerPersonAmount(amount && updatedSharedWith.length > 0 ? parseFloat(amount) / updatedSharedWith.length : 0);
    };

    const handleSubmit = async () => {
        if (!amount || !groupId || !user?.id || sharedWith.length === 0) return;

        const expenseData = {
            amount: parseFloat(amount),
            groupId,
            payerId: user.id,
            sharedWithUserIds: sharedWith,
        };

        try {
            await api.post("/expenses", expenseData);
            onClose();
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-lg font-semibold text-center">Add an expense</h2>

                {/* "With you and: All of {GroupName}" */}
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-3 mb-3">
                    <span className="text-gray-600">
                        With you and: <strong>All of {groupName}</strong>
                    </span>
                    
                </div>

                {/* Amount Input */}
                <input 
                    type="number" 
                    value={amount} 
                    onChange={handleAmountChange} 
                    placeholder="Enter amount" 
                    className="border p-2 w-full rounded-md mb-3"
                />

                {/* Split Info */}
                <p className="text-sm text-gray-700">
                    Paid by <strong>you</strong> and split <strong>equally</strong>. <br />
                    (<span className="font-semibold text-green-600">₹{perPersonAmount.toFixed(2)}</span> per person)
                </p>

                {/* Select Users */}
                <div className="mb-4">
                    <h3 className="text-sm font-semibold mt-3">Select Members to Split With:</h3>
                    <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
                        {groupMembers.map((member) => (
                            <label key={member.id} className="flex items-center gap-2">
                                <input 
                                    type="checkbox"
                                    checked={sharedWith.includes(member.id)}
                                    onChange={() => handleUserSelect(member.id)}
                                />
                                {member.name}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700 p-2"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExpenseModal;
