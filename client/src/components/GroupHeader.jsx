const GroupHeader = ({
  groupName,
  onOpenExpenseModal,
  setConfirmLeaveOpen,
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-4xl font-extrabold text-black font-bebas tracking-wide">
        {groupName}
      </h2>
      <button
        onClick={onOpenExpenseModal}
        className="bg-[#030303] hover:brightness-75 text-[#fbfbfb] font-semibold px-4 py-2 rounded-md transition"
      >
        Add Expense
      </button>
      <button
        onClick={() => setConfirmLeaveOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition"
      >
        Leave Group
      </button>
    </div>
  );
};

export default GroupHeader;
