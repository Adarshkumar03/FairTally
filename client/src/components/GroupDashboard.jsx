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
        return <p>No group selected</p>;
    }

    return (
        <div className="grid grid-cols-3 gap-6 rounded-md">
            {/* Middle Section: Transactions */}
            <div className="col-span-2">
                {/* Buttons for Actions */}
                <div className="flex justify-between mt-4">
                <h2 className="text-3xl font-bold text-[#fbfbfb]">{selectedGroup.name}</h2>
                    <button 
                        onClick={() => setExpenseModalOpen(true)} 
                        className="bg-linear-65 from-[#57bc4d] to-[#398c31] text-[#fbfbfb] font-bold p-2 rounded-md"
                    >
                        Add Expense
                    </button>
                </div>

                {/* Transaction History */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-10 text-[#c4c7d1] flex justify-center">Group Transactions</h3>
                    <TransactionList groupId={selectedGroup.id} refreshGroupDetails={fetchGroupDetails}/>
                </div>
            </div>

            {/* Right Section: Group Members */}
            <div className="bg-[#121729] p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-[#fbfbfc]">Group Members</h3>
                {groupDetails ? (
                    <ul>
                    {groupDetails.users.map((user) => (
                        <div 
                            key={user.id} 
                            onClick={() => openOweDetailsModal(user)}
                            className="flex items-center gap-4 p-2 cursor-pointer hover:bg-[#202e5f] rounded-md "
                        >
                            {/* Circular div for profile */}
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-semibold">
                                {user.name.charAt(0)}
                            </div>
        
                            {/* Name & Amount Owed */}
                            <div className="flex flex-col">
                                <span className="font-semibold text-[#ecedf1]">{user.name}</span>
                                <span className="text-sm text-gray-400">Owes ₹{user.totalOwedAmount || 0}</span>
                            </div>
                        </div>
                    ))}
                </ul>
        
                ) : (
                    <p>Loading members...</p>
                )}

                {/* Add User Button */}
                <button
                    onClick={() => setUserModalOpen(true)}
                    className="bg-linear-65 from-[#57bc4d] to-[#398c31] text-[#fbfbfb] font-bold p-2 rounded-md mt-4 w-full hover:bg-green-600 transition"
                >
                    Add Users
                </button>
            </div>

            {/* AddUserModal */}
            {userModalOpen && (
                <AddUserModal
                    groupId={selectedGroup.id}
                    onClose={() => setUserModalOpen(false)}
                    userId = {useAuthStore.getState().user}
                />
            )}
            {oweModalOpen && (
    <OweDetailsModal user={selectedUser} groupId={selectedGroup.id} onClose={() => setOweModalOpen(false)} />
)}
            {expenseModalOpen && (
    <AddExpenseModal 
        groupId={selectedGroup.id} 
        groupName={selectedGroup.name} // ✅ Pass group name
        groupMembers={groupDetails?.users || []} // ✅ Pass group members safely
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
