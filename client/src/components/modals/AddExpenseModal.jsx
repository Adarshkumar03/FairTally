import { useState, useCallback } from "react";
import useAuthStore from "../../store/authStore";
import useTransactionStore from "../../store/transactionStore";
import api from "../../utils/api";
import { toast } from "react-toastify";

const AddExpenseModal = ({ groupId, groupName, groupMembers, onClose }) => {
    const { user } = useAuthStore();
    const { fetchGroupTransactions } = useTransactionStore(); 
    const [amount, setAmount] = useState("");
    const [sharedWith, setSharedWith] = useState(groupMembers.map((member) => member.id));
    const [perPersonAmount, setPerPersonAmount] = useState(0);

    const calculatePerPersonAmount = useCallback((amt, members) => {
        return amt && members.length > 0 ? (parseFloat(amt) / members.length).toFixed(2) : 0;
    }, []);

    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
        setPerPersonAmount(calculatePerPersonAmount(newAmount, sharedWith));
    };

    const handleUserSelect = (userId) => {
        const updatedSharedWith = sharedWith.includes(userId)
            ? sharedWith.filter((id) => id !== userId)
            : [...sharedWith, userId];

        setSharedWith(updatedSharedWith);
        setPerPersonAmount(calculatePerPersonAmount(amount, updatedSharedWith));
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
            await fetchGroupTransactions(groupId); // ✅ Refresh transactions after adding an expense
            onClose();
            toast.success("Successfully Added Expense!!");
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error("Failed to add expense!");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-[#FEF5E4] w-96 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-2xl font-bold text-center text-[#030C03]">Add an Expense</h2>

                {/* "With you and: All of {GroupName}" */}
                <div className="flex items-center justify-center bg-[#F7C236] p-3 rounded-md mt-3 mb-3">
                    <span className="text-[#030C03] text-lg font-medium">
                        With you and all of <strong>{groupName}</strong>
                    </span>
                </div>

                {/* Amount Input */}
                <input 
                    type="number" 
                    value={amount} 
                    onChange={handleAmountChange} 
                    placeholder="Enter amount" 
                    className="border p-2 w-full rounded-md mb-3 text-[#030C03] text-lg font-medium"
                />

                {/* Split Info */}
                <p className="text-sm text-[#306B34] font-semibold">
                    Paid by <strong>you</strong> and split <strong>equally</strong>. <br />
                    (<span className="text-lg font-bold text-[#306B34]">₹{perPersonAmount}</span> per person)
                </p>

                {/* Select Users */}
                <div className="mb-4">
                    <h3 className="text-md font-semibold mt-3 text-[#030C03] text-center">Select Members to Split With</h3>
                    <div className="border rounded-md p-2 max-h-40 overflow-y-auto bg-[#FFF6E5]">
                        {groupMembers.map((member) => (
                            <label key={member.id} className="flex items-center gap-2 text-[#030C03] text-lg">
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
                        className="bg-[#D9534F] text-[#FFF6E5] hover:bg-[#C9302C] p-2 rounded-md font-semibold text-lg transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        className="bg-[#306B34] text-[#FFF6E5] p-2 rounded-md hover:bg-[#265427] transition font-semibold text-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExpenseModal;
