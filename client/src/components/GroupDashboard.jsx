import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import TransactionHistory from "./TransactionHistory";
import AddUserModal from "./modals/AddUserModal";
import AddExpenseModal from "./modals/AddExpenseModal";
import OweDetailsModal from "./modals/OweDetailsModal";
import api from "../utils/api";
import useAuthStore from "../store/authStore";

const GroupDashboard = () => {
    const { selectedGroup, setSettleModalOpen } = useOutletContext();
    const [transactions, setTransactions] = useState([]);
    const [groupDetails, setGroupDetails] = useState(null);
    const [loading, setLoading] = useState(true);
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
            fetchGroupDetails();
            fetchTransactions();
        }
    }, [selectedGroup]);

    const fetchGroupDetails = async () => {
        try {
            const response = await api.get(`/groups/${selectedGroup.id}`);
            setGroupDetails(response.data);
        } catch (error) {
            console.error("Error fetching group details:", error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await api.get(`/transactions/group/${selectedGroup.id}`);
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!selectedGroup) {
        return <p>No group selected</p>;
    }

    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Middle Section: Transactions */}
            <div className="col-span-2">
                <h2 className="text-2xl font-bold">{selectedGroup.name}</h2>

                {/* Buttons for Actions */}
                <div className="flex gap-4 mt-4">
                    <button 
                        onClick={() => setExpenseModalOpen(true)} 
                        className="bg-green-500 text-white p-2 rounded-md"
                    >
                        Add Expense
                    </button>
                    <button 
                        onClick={() => setSettleModalOpen(true)} 
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Settle Expenses
                    </button>
                </div>

                {/* Transaction History */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Group Transactions</h3>
                    {loading ? <p>Loading transactions...</p> : <TransactionHistory transactions={transactions} />}
                </div>
            </div>

            {/* Right Section: Group Members */}
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold mb-4">Group Members</h3>
                {groupDetails ? (
                    <ul>
                    {groupDetails.users.map((user) => (
                        <div 
                            key={user.id} 
                            onClick={() => openOweDetailsModal(user)}
                            className="flex items-center gap-4 p-2 border-b cursor-pointer hover:bg-gray-200 rounded-md"
                        >
                            {/* Circular div for profile */}
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-semibold">
                                {user.name.charAt(0)}
                            </div>
        
                            {/* Name & Amount Owed */}
                            <div className="flex flex-col">
                                <span className="font-semibold">{user.name}</span>
                                <span className="text-sm text-gray-600">Owes ₹{user.totalOwedAmount || 0}</span>
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
                    className="bg-green-500 text-white p-2 rounded-md mt-4 w-full hover:bg-green-600 transition"
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
            fetchGroupDetails();
        }}
    />
)}

        </div>
    );
};

export default GroupDashboard;
