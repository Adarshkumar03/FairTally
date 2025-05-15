import { useState } from "react";
import useAuthStore from "../../store/authStore";
import api from "../../utils/api";
import { toast } from "react-toastify";
import useTransactionStore from "../../store/transactionStore";

const AddFriendExpenseModal = ({ friendId,friendName, onClose }) => {
    const { user } = useAuthStore();
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [amountError, setAmountError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const { fetchFriendTransactions } = useTransactionStore(); 

    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
        setAmountError("");
    };

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        setDescriptionError("");
    };

    const handleSubmit = async () => {
        if (!description.trim()) {
            setDescriptionError("Description cannot be empty!");
            return;
        }

        const numericAmount = parseFloat(amount);
        if (!numericAmount || numericAmount <= 0) {
            setAmountError("Please enter a valid amount greater than 0.");
            return;
        }

        if (!user?.id) {
            toast.error("Something went wrong. Please refresh and try again.");
            return;
        }

        const expenseData = {
            amount: numericAmount,
            payerId: user.id,
            payeeId: friendId,
            description: description.trim(),
        };

        try {
            await api.post(`/friends/${friendId}/expenses`, expenseData);
            await fetchFriendTransactions(friendId);
            onClose();
            toast.success("Successfully Added Expense with Friend!!");
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error("Failed to add expense!");
        }
    };

    const isSubmitDisabled = !description.trim() || !amount || parseFloat(amount) <= 0;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] mt-16">
            <div className="bg-[#FEF5E4] w-96 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-2xl font-bold text-center text-[#030C03] mb-4">Add an Expense with {friendName}</h2>
                <input 
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter description"
                    className={`border p-2 w-full rounded-md mb-3 text-[#030C03] text-lg font-medium ${descriptionError ? "border-red-500" : ""}`}
                />
                {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}

                <input 
                    type="number" 
                    value={amount} 
                    onChange={handleAmountChange} 
                    placeholder="Enter amount" 
                    className={`border p-2 w-full rounded-md mb-3 text-[#030C03] text-lg font-medium ${amountError ? "border-red-500" : ""}`}
                />
                {amountError && <p className="text-red-500 text-sm">{amountError}</p>}

                <div className="flex justify-between">
                    <button 
                        onClick={onClose} 
                        className="bg-[#D9534F] text-[#FFF6E5] hover:bg-[#C9302C] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] p-2 rounded-md font-semibold text-lg transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitDisabled}
                        className={`bg-[#306B34] text-[#FFF6E5] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] p-2 rounded-md hover:bg-[#265427] transition-all duration-300 font-semibold text-lg ${isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : ""}`}
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFriendExpenseModal;
