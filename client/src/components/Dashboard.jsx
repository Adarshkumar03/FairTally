import UserTransactionList from "./UserTransactionList";
const Dashboard = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-[#030303]">Dashboard</h2>
            
            <section className="mt-6">
                <h3 className="text-xl font-semibold text-[#030C03]">
                    Transaction History
                </h3>
                <UserTransactionList />
            </section>
        </div>
    );
};

export default Dashboard;
