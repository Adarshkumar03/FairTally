import UserTransactionList from "./UserTransactionList";
const Dashboard = () => {
    return (
        <div>
            <h2 className="text-4xl font-bold text-[#030303] font-bebas tracking-wide">Dashboard</h2>
            
            <section className="mt-6">
                <h3 className="text-2xl font-semibold text-[#030C03]">
                    Transaction History
                </h3>
                <UserTransactionList />
            </section>
        </div>
    );
};

export default Dashboard;
