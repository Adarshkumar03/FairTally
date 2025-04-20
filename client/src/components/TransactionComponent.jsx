import TransactionItem from "./TransactionItem";
const TransactionComponent = ({ transactions, loading, user, onSettle, isFriendView }) => {
    if (loading) return <p className="text-center text-gray-400">Loading transactions...</p>;

    return (
        <div className="mt-4">
            {transactions.length > 0 ? (
                <ul className="space-y-4">
                    {transactions.map((tx) => (
                        <TransactionItem 
                            key={tx.id}
                            tx={tx}
                            isUserInvolved={user?.id === tx.payerId || user?.id === tx.payeeId}
                            onSettle={onSettle}
                            isFriendView={isFriendView}
                        />
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 text-center font-semibold">No transactions yet</p>
            )}
        </div>
    );
};

export default TransactionComponent;