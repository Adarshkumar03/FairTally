import { useState } from "react";
import LogoutButton from "./LogoutButton"

const Dashboard = () => {
  const [groups, setGroups] = useState(["Puri", "TestGroup"]);
  const [friends, setFriends] = useState([
    "Abhinandan",
    "Kartik Singh Nit Rai...",
    "Kashish",
    "Ramaneesh P V",
    "Ravi Bhatt",
    "Srajan Goyal",
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-4 shadow-lg">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <h3 className="text-red-500 font-semibold mt-2">Recent Activity</h3>
        <div>
          <h3 className="font-semibold mt-4">GROUPS</h3>
          {groups.map((group, index) => (
            <p key={index} className="text-green-600 cursor-pointer">{group}</p>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">FRIENDS</h3>
          {friends.map((friend, index) => (
            <p key={index} className="text-gray-600 cursor-pointer">{friend}</p>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <LogoutButton/>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">TestGroup</h2>
          <div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-2">Add an expense</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Settle up</button>
          </div>
        </div>
        <div className="border p-6 rounded-lg bg-white shadow-md">
          <p className="text-gray-600 text-center">You have not added any expenses yet</p>
          <p className="text-gray-500 text-center">To add a new expense, click the orange "Add an expense" button.</p>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 bg-white p-4 shadow-lg">
        <h3 className="font-semibold">GROUP BALANCES</h3>
        <div className="flex items-center mt-2">
          <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full" />
          <p className="ml-2 font-medium">Adarsh Kumar settled up</p>
        </div>
        <a href="#" className="text-blue-500 mt-2 block">View details »</a>
      </aside>
    </div>
  );
};

export default Dashboard;
