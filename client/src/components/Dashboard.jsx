import { useState, useEffect } from "react";
import GroupList from "./GroupList";
import TransactionHistory from "./TransactionHistory";
import UserSidebar from "./UserSidebar";
import AddGroupModal from "./modals/AddGroupModal";
import AddExpenseModal from "./modals/AddExpenseModal";
import SettleExpenseModal from "./modals/SettleExpenseModal";
import api from "../utils/api";

const Dashboard = () => {
    const [isGroupModalOpen, setGroupModalOpen] = useState(false);
    const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
    const [isSettleModalOpen, setSettleModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, [selectedGroup]);

    const fetchTransactions = async () => {
        try {
            const endpoint = selectedGroup 
                ? `/transactions/group/${selectedGroup.id}`
                : `/transactions/user`;
            const response = await api.get(endpoint);
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    return (
        <div className="grid grid-cols-4 h-screen">
            {/* Left Sidebar (Groups List) */}
            <div className="col-span-1 bg-gray-100 p-4">
                <GroupList 
                    selectedGroup={selectedGroup}
                    onSelectGroup={setSelectedGroup}
                    onAddGroup={() => setGroupModalOpen(true)} 
                />
            </div>

            {/* Middle Section (Transaction History) */}
            <div className="col-span-2 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {selectedGroup ? selectedGroup.name : "Dashboard"}
                    </h2>
                    <div className="flex gap-4">
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
                            Settle
                        </button>
                    </div>
                </div>
                <TransactionHistory transactions={transactions} />
            </div>

            {/* Right Sidebar (User Info & Logout) */}
            <div className="col-span-1 bg-gray-100 p-4">
                <UserSidebar />
            </div>

            {/* Modals */}
            {isGroupModalOpen && <AddGroupModal onClose={() => setGroupModalOpen(false)} />}
            {isExpenseModalOpen && <AddExpenseModal groupId={selectedGroup?.id} onClose={() => setExpenseModalOpen(false)} />}
            {isSettleModalOpen && <SettleExpenseModal groupId={selectedGroup?.id} onClose={() => setSettleModalOpen(false)} />}
        </div>
    );
};

export default Dashboard;
