// import useTransactionStore from "../store/useTransactionStore";

const TransactionHistory = () => {
    // const { transactions } = useTransactionStore();

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Transaction History</h2>
            <ul>
                {/* {transactions.map(transaction => (
                    <li key={transaction.id} className="p-2 border-b">
                        {transaction.payerName} paid {transaction.amount} to {transaction.payeeName}
                    </li>
                ))} */}
            </ul>
        </div>
    );
};

export default TransactionHistory;
