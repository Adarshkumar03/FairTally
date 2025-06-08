import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import AddFriendExpenseModal from "./modals/AddFriendExpenseModal";
import TransactionList from "./TransactionList";
import api from "../utils/api";
import { toast } from "react-toastify";
import ConfirmModal from "./modals/ConfirmModal";
import UpdateExpenseModal from "./modals/UpdateExpenseModal";
import useTransactionStore from "../store/transactionStore";
import { FaPlusCircle, FaUserSlash } from "react-icons/fa";

const FriendDashboard = () => {
  const { selectedFriend, fetchFriends, refreshTx, setRefreshTx } =
    useOutletContext();
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const navigate = useNavigate();
  const { updateTransaction } = useTransactionStore();

  if (!selectedFriend)
    return <p className="text-center text-gray-400">No friend selected</p>;

  return (
    <main className="w-11/12 max-w-screen-lg mx-auto md:p-6 grid grid-cols-1 md:grid-cols-3">
      <article className="col-span-3 p-0 w-full">
        {/* Header as a separate visual block */}
        <header className="mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4 bg-[#C9B6E4] p-4 md:p-6 rounded-md shadow-md border-t-3 border-l-3 border-r-5 border-b-5 border-[#000]">
            <h2 className="text-4xl font-extrabold text-[#1C1F25] font-sora">
              {selectedFriend.name}
            </h2>
            <div className="flex gap-4 flex-wrap md:flex-nowrap">
              <button
                onClick={() => setExpenseModalOpen(true)}
                className="bg-[#030303] hover:brightness-75 text-[#fbfbfb] font-semibold px-4 py-2 rounded-md transition whitespace-nowrap"
              >
                <FaPlusCircle className="inline mr-2 text-lg md:text-xl" />
                Add Expense
              </button>
              <button
                onClick={() => setConfirmRemoveOpen(true)}
                className="bg-[#A31621] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-md transition whitespace-nowrap"
              >
                <FaUserSlash className="inline mr-2 text-lg md:text-xl" />
                Remove Friend
              </button>
            </div>
          </div>
        </header>

        {/* Section with border and background */}
        <section className="bg-[#FFF7EC] p-6 rounded-md shadow-2xl border-t-3 border-l-3 border-r-5 border-b-5 border-[#000]">
          <h2 className="text-2xl font-bold text-[#040404] text-center mb-4 font-sora">
            Your Transactions with {selectedFriend.name}
          </h2>
          <TransactionList
            friendId={selectedFriend.id}
            isFriendView
            onEdit={(tx) => setEditTx(tx)}
            refreshTx={refreshTx}
            setRefreshTx={setRefreshTx}
          />
        </section>
      </article>

      {expenseModalOpen && (
        <AddFriendExpenseModal
          friendId={selectedFriend.id}
          friendName={selectedFriend.name}
          onClose={() => {
            setExpenseModalOpen(false);
            setRefreshTx((prev) => !prev);
          }}
        />
      )}

      {editTx && (
        <UpdateExpenseModal
          open={!!editTx}
          transaction={editTx}
          onClose={() => setEditTx(null)}
          onUpdate={(updatedTx) => {
            updateTransaction(updatedTx, true);
            setEditTx(null);
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
              await fetchFriends();
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
