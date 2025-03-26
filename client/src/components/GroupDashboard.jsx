import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import AddUserModal from "./modals/AddUserModal";
import AddExpenseModal from "./modals/AddExpenseModal";
import OweDetailsModal from "./modals/OweDetailsModal";
import api from "../utils/api";
import useAuthStore from "../store/authStore";
import TransactionList from "./TransactionList";

const GroupDashboard = () => {
    const { selectedGroup, setSettleModalOpen } = useOutletContext();
    const [groupDetails, setGroupDetails] = useState(null);
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [expenseModalOpen, setExpenseModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [oweModalOpen, setOweModalOpen] = useState(false);

    const openOweDetailsModal = (user) => {
        setSelectedUser(user);
        setOweModalOpen(true);
    };

    useEffect(() => {
        if (selectedGroup) {
            fetchGroupDetails(selectedGroup.id);
        }
    }, [selectedGroup]);

    const fetchGroupDetails = async (groupId) => {
        try {
            const response = await api.get(`/groups/${groupId}`);
            setGroupDetails(response.data);
        } catch (error) {
            console.error("Error fetching group details:", error);
        }
    };

    if (!selectedGroup) {
        return <p className="text-center text-gray-400">No group selected</p>;
    }

    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            {/* Middle Section: Transactions */}
            <div className="col-span-2 bg-[#F7C236] p-6 rounded-md shadow-2xl 
                            border-t-3 border-l-3 border-r-5 border-b-5 border-[#000] hover:shadow-3xl">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-extrabold text-black">{selectedGroup.name}</h2>
                    <button
                        onClick={() => setExpenseModalOpen(true)}
                        className="bg-[#030303] hover:brightness-75 text-[#fbfbfb] font-semibold px-4 py-2 rounded-lg transition"
                    >
                        Add Expense
                    </button>
                </div>

                {/* Transaction History */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold text-[#040404] text-center mb-4">Group Transactions</h3>
                    <TransactionList groupId={selectedGroup.id} refreshGroupDetails={fetchGroupDetails} />
                </div>
            </div>

            {/* Right Section: Group Members */}
            <div className="p-6 rounded-md shadow-2xl bg-[#909CC2] border-t-3 border-l-3 border-r-5 border-b-5 border-[#000]">
                <h3 className="text-2xl font-semibold text-white mb-4 text-center">Group Members</h3>

                {groupDetails ? (
                    <ul className="space-y-3">
                        {groupDetails.users.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => openOweDetailsModal(user)}
                                className="flex items-center gap-4 p-3 cursor-pointer bg-[#FFFFFF] text-black 
                                           hover:brightness-90 rounded-lg transition border-l-2 border-t-2 border-r-4 border-b-4 border-black shadow-md"
                            >
                                {/* Profile Circle */}
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#909CC2] text-white text-lg font-semibold">
                                    {user.name.charAt(0)}
                                </div>

                                {/* Name & Amount Owed */}
                                <div className="flex flex-col">
                                    <span className="font-semibold text-black">{user.name}</span>
                                    <span className="text-sm text-gray-400">Owes ₹{user.totalOwedAmount || 0}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 text-center">Loading members...</p>
                )}

                {/* Add User Button */}
                <button
                    onClick={() => setUserModalOpen(true)}
                    className="w-full mt-6 bg-[#306B34] text-[#fff] hover:bg-green-700 font-semibold px-4 py-2 rounded-lg transition"
                >
                    Add Users
                </button>
            </div>

            {/* Modals */}
            {userModalOpen && (
                <AddUserModal
                    groupId={selectedGroup.id}
                    onClose={() => setUserModalOpen(false)}
                    userId={useAuthStore.getState().user.id}
                />
            )}
            {oweModalOpen && (
                <OweDetailsModal user={selectedUser} groupId={selectedGroup.id} onClose={() => setOweModalOpen(false)} />
            )}
            {expenseModalOpen && (
                <AddExpenseModal
                    groupId={selectedGroup.id}
                    groupName={selectedGroup.name}
                    groupMembers={groupDetails?.users || []}
                    onClose={() => {
                        setExpenseModalOpen(false);
                        fetchGroupDetails(selectedGroup.id);
                    }}
                />
            )}
        </div>
    );
};

export default GroupDashboard;
