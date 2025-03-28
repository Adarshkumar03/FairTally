import TransactionItem from "./TransactionItem";
const TransactionComponent = ({ transactions, loading, user, onSettle }) => {
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
                        />
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center">No transactions yet</p>
            )}
        </div>
    );
};

export default TransactionComponent;