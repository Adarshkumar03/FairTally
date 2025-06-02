import { useState, useEffect } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const UpdateExpenseModal = ({ open, onClose, transaction, onUpdate }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description || "");
      setAmount(transaction.amount?.toString() || "");
    }
  }, [transaction]);

  const handleUpdate = async () => {
    if (!description.trim() || !amount) {
      toast.error("Please enter valid description and amount.");
      return;
    }

    try {
      await api.put(`/transactions/${transaction.id}`, {
        description,
        amount: parseFloat(amount),
        payerId: transaction.payerId,
        payeeId: transaction.payeeId,
      });

      toast.success("Transaction updated!");
      onUpdate?.({
        ...transaction,
        description,
        amount: parseFloat(amount),
      });
      onClose();
    } catch (err) {
      console.error("Failed to update transaction:", err);
      toast.error("Error updating transaction");
    }
  };

  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-[9999]">
      <div className="bg-[#FCF5E5] p-6 rounded-2xl shadow-lg w-full max-w-md border-2 border-black">
        <h2 className="text-3xl font-bold mb-4 text-center font-bebas">Update Expense</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            className="w-full px-4 py-2 border-2 border-black rounded-lg bg-white text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full px-4 py-2 border-2 border-black rounded-lg bg-white text-black"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-[#D9534F] text-[#FFF6E5] hover:bg-[#C9302C] border-2 border-black px-4 py-2 rounded-md hover:brightness-105 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-yellow-300 border-2 border-black text-black px-4 py-2 rounded-md font-semibold hover:brightness-105 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateExpenseModal;
