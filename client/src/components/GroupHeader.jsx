import { FaPlusCircle } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
const GroupHeader = ({
  groupName,
  onOpenExpenseModal,
  setConfirmLeaveOpen,
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <h2 className="text-4xl font-extrabold text-[#1C1F25] font-bebas tracking-wide">
        {groupName}
      </h2>
      <div className="flex gap-4">
        <button
          onClick={onOpenExpenseModal}
          className="bg-[#C86B25] hover:brightness-75 text-[#fbfbfb] font-semibold px-4 py-2 rounded-md transition"
        >
          <FaPlusCircle className="inline mr-2 text-xl"/>Add Expense
        </button>
        <button
          onClick={() => setConfirmLeaveOpen(true)}
          className="bg-[#A31621] hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-md transition"
        >
          <FaUserSlash className="inline mr-2 text-xl"/>Leave Group
        </button>
      </div>
    </div>
  );
};

export default GroupHeader;
