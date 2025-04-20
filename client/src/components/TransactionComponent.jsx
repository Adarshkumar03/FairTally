import { useState } from "react";
import TransactionItem from "./TransactionItem";
const TransactionComponent = ({
  transactions,
  loading,
  user,
  onSettle,
  isFriendView,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  if (loading)
    return <p className="text-center text-gray-400">Loading transactions...</p>;

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-[#306B34] rounded-md focus:outline-none focus:ring-2 focus:ring-[#306B34]"
      />
      {transactions.length > 0 ? (
        <ul className="space-y-4">
          {transactions
            .filter((tx) => {
              const lower = searchTerm.toLowerCase();
              return (
                tx.payerName.toLowerCase().includes(lower) ||
                tx.payeeName.toLowerCase().includes(lower) ||
                tx.description.toLowerCase().includes(lower)
              );
            })
            .map((tx) => (
              <TransactionItem
                key={tx.id}
                tx={tx}
                isUserInvolved={
                  user?.id === tx.payerId || user?.id === tx.payeeId
                }
                onSettle={onSettle}
                isFriendView={isFriendView}
              />
            ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center font-semibold">
          No transactions yet
        </p>
      )}
    </div>
  );
};

export default TransactionComponent;
