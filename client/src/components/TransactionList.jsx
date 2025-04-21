import { useEffect, useState, useCallback } from "react";
import api from "../utils/api";
import useAuthStore from "../store/authStore";
import useTransactionStore from "../store/transactionStore";
import { toast } from "react-toastify";
import TransactionComponent from "./TransactionComponent";

const TransactionList = ({
  groupId,
  friendId,
  isFriendView = false,
  onSettle,
}) => {
  const {
    groupTransactions,
    friendTransactions,
    fetchGroupTransactions,
    fetchFriendTransactions,
  } = useTransactionStore();

  const transactions = isFriendView ? friendTransactions : groupTransactions;
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  const fetchTransactions = useCallback(() => {
    setLoading(true);
    const fetchFn = isFriendView
      ? () => fetchFriendTransactions(friendId)
      : () => fetchGroupTransactions(groupId);

    fetchFn().finally(() => setLoading(false));
  }, [isFriendView, friendId, groupId, fetchFriendTransactions, fetchGroupTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSettleTransaction = async (transactionId) => {
    try {
      await api.put(`/transactions/${transactionId}/settle`);
      fetchTransactions();
      toast.success("Transaction settled!");
    } catch (error) {
      console.error("Error settling transaction:", error);
      toast.error("Failed to settle transaction");
    }
  };

  return (
    <TransactionComponent
      transactions={transactions}
      loading={loading}
      user={user}
      onSettle={onSettle || handleSettleTransaction}
      isFriendView={isFriendView}
    />
  );
};

export default TransactionList;
