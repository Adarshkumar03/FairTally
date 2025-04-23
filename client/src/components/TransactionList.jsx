import { useEffect, useState, useCallback } from "react";
import api from "../utils/api";
import useAuthStore from "../store/authStore";
import useTransactionStore from "../store/transactionStore";
import { toast } from "react-toastify";
import TransactionItem from "./TransactionItem";
import ConfirmModal from "./modals/ConfirmModal";

const TransactionList = ({ groupId, friendId, isFriendView = false, onSettle, onEdit, refreshTx, setRefreshTx }) => {
  const {
    fetchGroupTransactions,
    fetchFriendTransactions,
  } = useTransactionStore();

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const { user } = useAuthStore();
  const transactions = useTransactionStore((state) =>
    isFriendView ? state.friendTransactions : state.groupTransactions
  );

  const fetchTransactions = useCallback(() => {
    setLoading(true);
    const fetchFn = isFriendView
      ? () => fetchFriendTransactions(friendId)
      : () => fetchGroupTransactions(groupId);

    fetchFn().finally(() => setLoading(false));
  }, [isFriendView, friendId, groupId, fetchFriendTransactions, fetchGroupTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions, refresh]);

  
  const handleSettleTransaction = async (transactionId) => {
    try {
      await api.put(`/transactions/${transactionId}/settle`);
      await fetchTransactions();
      setRefresh((prev) => !prev);
      toast.success("Transaction settled!");
    } catch (error) {
      console.error("Error settling transaction:", error);
      toast.error("Failed to settle transaction");
    }
  };
  
  

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await api.delete(`/transactions/${transactionId}`);
      fetchTransactions();
      toast.success("Transaction deleted!");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  const handleDeleteConfirm = async () => {
    await handleDeleteTransaction(selectedTransactionId);
    setConfirmDeleteOpen(false);
    setSelectedTransactionId(null);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const lower = searchTerm.toLowerCase();
    return (
      tx.payerName.toLowerCase().includes(lower) ||
      tx.payeeName.toLowerCase().includes(lower) ||
      tx.description.toLowerCase().includes(lower)
    );
  });

  if (loading) {
    return <p className="text-center text-gray-400">Loading transactions...</p>;
  }

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-4 py-2 border-2 border-black rounded-lg bg-[#FCF5E5] text-[#030303] placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#306B34] focus:border-[#306B34] transition-all duration-300 shadow-md"
      />

      {filteredTransactions.length > 0 ? (
        <ul className="space-y-4">
          {filteredTransactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              tx={tx}
              isUserInvolved={user?.id === tx.payerId || user?.id === tx.payeeId}
              onSettle={onSettle || handleSettleTransaction}
              isFriendView={isFriendView}
              onDelete={(id) => {
                setSelectedTransactionId(id);
                setConfirmDeleteOpen(true);
              }}
              onEdit={onEdit}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center font-semibold">No transactions found</p>
      )}

      {confirmDeleteOpen && (
        <ConfirmModal
          open={confirmDeleteOpen}
          title="Delete Transaction"
          message="Are you sure you want to delete this transaction?"
          onCancel={() => {
            setConfirmDeleteOpen(false);
            setSelectedTransactionId(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default TransactionList;
