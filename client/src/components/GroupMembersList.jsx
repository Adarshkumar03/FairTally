import { FaUsers } from "react-icons/fa6";

const GroupMembersList = ({ groupDetails, onOpenOweDetails, setOweModalOpen, onOpenUserModal }) => {
    return (
        <div className="flex flex-col justify-between p-6 rounded-md shadow-2xl bg-[#eef0f6] border-t-3 border-l-3 border-r-5 border-b-5 border-[#000]">
            <div>
                <h3 className="text-2xl font-bold text-black mb-4 text-center font-montserrat tracking-normal">Group Members</h3>
                {groupDetails ? (
                    <ul className="space-y-3">
                        {groupDetails.users.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => {
                                    if (user.totalOwedAmount > 0 || user.totalReceivableAmount > 0) {
                                        onOpenOweDetails(user);
                                        setOweModalOpen(true);
                                    }
                                }}
                                className="flex items-center gap-4 p-3 cursor-pointer bg-[#FFFFFF] text-black 
                                           hover:brightness-90 rounded-lg transition border-l-2 border-t-2 border-r-4 border-b-4 border-black shadow-md"
                            >
                                <div className="w-12 h-12 min-w-[3rem] flex items-center justify-center rounded-full bg-[#909CC2] text-white text-lg font-semibold">
                                    {user.name.charAt(0)}
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-semibold text-black">{user.name}</span>

                                    {user.totalOwedAmount > 0 ? (
                                        <>
                                            <span className="text-sm text-gray-500 font-medium">
                                                Owes <span className="font-bold text-black">₹{user.totalOwedAmount}</span> to other group members
                                            </span>
                                            <span className="text-xs text-gray-400 italic">(Tap to view detailed breakdown)</span>
                                        </>
                                    ) : user.totalReceivableAmount > 0 ? (
                                        <span className="text-sm text-green-600 font-medium">
                                            Is owed <span className="font-bold text-black">₹{user.totalReceivableAmount}</span> by group members
                                        </span>
                                    ) : (
                                        <span className="text-sm text-green-500 font-medium">All clear! No dues pending.</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 text-center">Loading members...</p>
                )}
            </div>

            <button
                onClick={onOpenUserModal}
                className="w-full mt-6 bg-[#255E3B] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-white hover:bg-[#1f4a2b] font-semibold px-4 py-2 rounded-lg transition-all duration-300"
            >
                <FaUsers className="inline mr-2 text-lg" />
                Add Users
            </button>
        </div>
    );
};

export default GroupMembersList;
