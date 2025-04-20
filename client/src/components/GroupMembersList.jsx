const GroupMembersList = ({ groupDetails, onOpenOweDetails, setOweModalOpen, onOpenUserModal }) => {
    return (
        <div className="flex flex-col justify-between p-6 rounded-md shadow-2xl bg-[#909CC2] border-t-3 border-l-3 border-r-5 border-b-5 border-[#000]">
            <div>
                <h3 className="text-3xl font-bold text-white mb-4 text-center font-bebas tracking-wide">Group Members</h3>
                {groupDetails ? (
                    <ul className="space-y-3">
                        {groupDetails.users.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => { onOpenOweDetails(user); setOweModalOpen(true); }}
                                className="flex items-center gap-4 p-3 cursor-pointer bg-[#FFFFFF] text-black 
                                           hover:brightness-90 rounded-lg transition border-l-2 border-t-2 border-r-4 border-b-4 border-black shadow-md"
                            >
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#909CC2] text-white text-lg font-semibold">
                                    {user.name.charAt(0)}
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-semibold text-black">{user.name}</span>
                                    <span className="text-sm text-gray-400 font-bold">Owes ₹{user.totalOwedAmount || 0}</span>
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
                className="w-full mt-6 bg-[#306B34] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-[#fff] hover:bg-green-700 font-semibold px-4 py-2 rounded-lg transition-all duration-300"
            >
                Add Users
            </button>
        </div>
    );
};

export default GroupMembersList;
