import { useState } from "react";

const TransactionItem = ({
  tx,
  isUserInvolved,
  onSettle,
  isFriendView,
  onDelete,
}) => {
  const backgroundColor = isFriendView ? "#E3F4E0" : "#FBE7A1";
  const [isSettled, setIsSettled] = useState(tx.settled);

  const handleSettleClick = async () => {
    try {
      await onSettle(tx.id);
      setIsSettled(true);
    } catch (err) {
      console.error("Settle failed", err);
    }
  };

  return (
    <li
      className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-md shadow-md border-t-2 border-l-2 border-b-4 border-r-4 border-black space-y-2 sm:space-y-0"
      style={{ backgroundColor }}
    >
      <div className="flex flex-col w-full sm:w-auto">
        <span className="text-base sm:text-lg font-bold leading-tight">
          <span className="text-[#030C03]">{tx.payerName}</span>{" "}
          <span className="text-[#306B34] font-extrabold">paid</span>{" "}
          <span className="text-[#030303]">₹{tx.amount}</span>{" "}
          <span className="text-[#030C03]">on behalf of</span>{" "}
          <span className="text-[#030303] font-bold">{tx.payeeName}</span>
        </span>

        <span className="mt-1 text-sm sm:text-base text-[#030C03] italic font-medium">
          {tx.description}
        </span>

        <span
          className={`text-sm sm:text-base mt-1 ${
            isSettled
              ? "text-green-600 font-bold"
              : "text-[#A31621] font-semibold"
          }`}
        >
          {isSettled ? "✅ Settled" : "🕒 Pending"}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:items-center">
        {!isSettled && isUserInvolved && (
          <button
            onClick={handleSettleClick}
            className="bg-[#FCF5E5] border-l-2 border-t-2 border-r-4 border-b-4 border-black text-black px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-semibold shadow-sm hover:brightness-110 transition-all duration-300"
          >
            Settle
          </button>
        )}
        {isUserInvolved && (
          <button
            onClick={() => onDelete(tx.id)}
            className="bg-red-100 border-l-2 border-t-2 border-r-4 border-b-4 border-black text-black px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-semibold shadow-sm hover:brightness-110 transition-all duration-300"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default TransactionItem;
