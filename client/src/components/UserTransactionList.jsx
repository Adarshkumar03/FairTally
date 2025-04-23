import { useEffect, useState } from "react";
import api from "../utils/api";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";
import TransactionList from "./TransactionList";
import UpdateExpenseModal from "./modals/UpdateExpenseModal";

const UserTransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTx, setEditTx] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchUserTransactions(user.id);
  }, [user]);

  const fetchUserTransactions = async (userId) => {
    try {
      const response = await api.get(`/transactions/users/${userId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false);
  };

  const updateTransactionInList = (updatedTx) => {
    setTransactions((prevTxs) =>
      prevTxs.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
  };

  const deleteTransactionFromList = (txId) => {
    setTransactions((prevTxs) => prevTxs.filter((tx) => tx.id !== txId));
  };

  const handleSettleTransaction = async (transactionId) => {
    try {
      const { data: updatedTx } = await api.put(
        `/transactions/${transactionId}/settle`
      );
      updateTransactionInList(updatedTx);
      toast.success("Transaction settled!");
    } catch (error) {
      console.error("Error settling transaction:", error);
      toast.error("Failed to settle transaction");
    }
  };

  const handleUpdateTransaction = async (updatedTx) => {
    updateTransactionInList(updatedTx);
    toast.success("Transaction updated!");
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await api.delete(`/transactions/${transactionId}`);
      deleteTransactionFromList(transactionId);
      toast.success("Transaction deleted!");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-400">Loading transactions...</p>
    );

  return (
    <>
      <TransactionList
        transactions={transactions}
        loading={loading}
        user={user}
        onSettle={handleSettleTransaction}
        onUpdate={(tx) => setEditTx(tx)}
        onDelete={handleDeleteTransaction}
      />

      <UpdateExpenseModal
        open={!!editTx}
        transaction={editTx}
        onClose={() => setEditTx(null)}
        onUpdate={(updatedTx) => {
          handleUpdateTransaction(updatedTx);
          setEditTx(null);
        }}
      />
    </>
  );
};

export default UserTransactionList;
