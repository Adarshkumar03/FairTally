import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import AddFriendExpenseModal from "./modals/AddFriendExpenseModal";
import TransactionList from "./TransactionList";
import useTransactionStore from "../store/transactionStore";

const FriendDashboard = () => {
    const { selectedFriend } = useOutletContext();
    const [expenseModalOpen, setExpenseModalOpen] = useState(false);

    const { fetchFriendTransactions } = useTransactionStore();

    useEffect(() => {
        if (selectedFriend?.id) {
            fetchFriendTransactions(selectedFriend.id);
        }
    }, [selectedFriend, fetchFriendTransactions]);

    if (!selectedFriend) return <p className="text-center text-gray-400">No friend selected</p>;

    return (
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-6 w-4/5 mx-auto">
            <article className="col-span-3 bg-[#C9B6E4] p-4 md:p-6 rounded-md shadow-2xl border-t-3 border-l-3 border-r-5 border-b-5 border-[#000] hover:shadow-3xl w-full">
                <header className="flex justify-between items-center">
                    <h2 className="text-4xl font-bold text-[#030303] font-bebas">{selectedFriend.name}</h2>
                    <button
                        onClick={() => setExpenseModalOpen(true)}
                        className="bg-[#030303] hover:brightness-75 text-[#fbfbfb] font-semibold px-4 py-2 rounded-md transition"
                    >
                        Add Expense
                    </button>
                </header>
                <section className="mt-6">
                    <h3 className="text-xl font-bold text-[#040404] text-center mb-4">Your Transactions with {selectedFriend.name}</h3>
                    <TransactionList friendId={selectedFriend.id} isFriendView />
                </section>
            </article>

            {expenseModalOpen && (
                <AddFriendExpenseModal
                    friendId={selectedFriend.id}
                    friendName={selectedFriend.name}
                    onClose={() => {
                        setExpenseModalOpen(false);
                        fetchFriendTransactions(selectedFriend.id);
                    }}
                />
            )}
        </main>
    );
};

export default FriendDashboard;
