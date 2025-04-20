import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import AddUserModal from "./modals/AddUserModal";
import AddExpenseModal from "./modals/AddExpenseModal";
import OweDetailsModal from "./modals/OweDetailsModal";
import TransactionList from "./TransactionList";
import GroupHeader from "./GroupHeader";
import GroupMembersList from "./GroupMembersList";
import useTransactionStore from "../store/transactionStore";

const GroupDashboard = () => {
    const { selectedGroup } = useOutletContext();
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [expenseModalOpen, setExpenseModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [oweModalOpen, setOweModalOpen] = useState(false);

    const { groupDetails, fetchGroupDetails } = useTransactionStore();

    useEffect(() => {
        if (selectedGroup?.id) {
            fetchGroupDetails(selectedGroup.id);
        }
    }, [selectedGroup, fetchGroupDetails]);

    if (!selectedGroup) return <p className="text-center text-gray-400">No group selected</p>;

    return (
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-6 w-full">
            <article className="col-span-2 bg-[#F7C236] p-4 md:p-6 rounded-md shadow-2xl border-t-3 border-l-3 border-r-5 border-b-5 border-[#000] hover:shadow-3xl w-full">
                <header>
                    <GroupHeader groupName={selectedGroup.name} onOpenExpenseModal={() => setExpenseModalOpen(true)} />
                </header>
                <section className="mt-4 md:mt-6">
                    <h3 className="text-xl md:text-2xl font-bold text-[#040404] text-center mb-4">Group Transactions</h3>
                    <TransactionList groupId={selectedGroup.id} />
                </section>
            </article>

            <aside>
                <GroupMembersList 
                    groupDetails={groupDetails}
                    onOpenOweDetails={setSelectedUser}
                    setOweModalOpen={setOweModalOpen}
                    onOpenUserModal={() => setUserModalOpen(true)}
                    className="w-full"
                />
            </aside>

            {userModalOpen && (
                <AddUserModal
                    groupId={selectedGroup.id}
                    onClose={() => setUserModalOpen(false)}
                    refreshGroupDetails={() => fetchGroupDetails(selectedGroup.id)}
                />
            )}
            {oweModalOpen && (
                <OweDetailsModal 
                    user={selectedUser} 
                    groupId={selectedGroup.id} 
                    onClose={() => setOweModalOpen(false)} 
                />
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
        </main>
    );
};

export default GroupDashboard;
