import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import AddFriendExpenseModal from "./modals/AddFriendExpenseModal";
import TransactionList from "./TransactionList";
import useTransactionStore from "../store/transactionStore";
import api from "../utils/api";
import { toast } from "react-toastify";
import ConfirmModal from "./modals/ConfirmModal";

const FriendDashboard = () => {
  const { selectedFriend, fetchFriends } = useOutletContext();
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const navigate = useNavigate();

  const { fetchFriendTransactions } = useTransactionStore();

  if (!selectedFriend)
    return <p className="text-center text-gray-400">No friend selected</p>;

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-6 w-4/5 mx-auto">
      <article className="col-span-3 bg-[#C9B6E4] p-4 md:p-6 rounded-md shadow-2xl border-t-3 border-l-3 border-r-5 border-b-5 border-[#000] hover:shadow-3xl w-full">
        <header className="flex justify-between items-center">
          <h2 className="text-4xl font-bold text-[#030303] font-bebas">
            {selectedFriend.name}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setExpenseModalOpen(true)}
              className="bg-[#030303] hover:brightness-75 text-[#fbfbfb] font-semibold px-4 py-2 rounded-md transition"
            >
              Add Expense
            </button>
            <button
              onClick={() => setConfirmRemoveOpen(true)}
              className="bg-[#A31621] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              Remove Friend
            </button>
          </div>
        </header>
        <section className="mt-6">
          <h3 className="text-xl font-bold text-[#040404] text-center mb-4">
            Your Transactions with {selectedFriend.name}
          </h3>
          <TransactionList friendId={selectedFriend.id} isFriendView />
        </section>
      </article>

      {expenseModalOpen && (
        <AddFriendExpenseModal
          friendId={selectedFriend.id}
          friendName={selectedFriend.name}
          onClose={() => {
            setExpenseModalOpen(false);
            fetchFriendTransactions(selectedFriend.id); // Refresh the transaction list after adding expense
          }}
        />
      )}

      {confirmRemoveOpen && (
        <ConfirmModal
          open={confirmRemoveOpen}
          title="Remove Friend"
          message={`Are you sure you want to remove ${selectedFriend.name} as a friend?`}
          onCancel={() => setConfirmRemoveOpen(false)}
          onConfirm={async () => {
            try {
              const res = await api.delete(`/friends/${selectedFriend.id}`);
              toast.success(res.data.message || "Friend removed");
              setConfirmRemoveOpen(false);
              await fetchFriends(); // Refresh the friend list
              navigate("/dashboard");
            } catch (err) {
              toast.error(
                err.response?.data?.message || "Error removing friend"
              );
            }
          }}
        />
      )}
    </main>
  );
};

export default FriendDashboard;
