import { useEffect, useState } from "react";
import api from "../../utils/api";

const AddFriendModal = ({ currentUserId, onClose, onFriendAdded }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/friends/potential");
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [currentUserId]);

    const handleAddFriend = async () => {
        if (!selectedUserId) return;

        try {
            await api.post("/friends/add", {
                friendId: selectedUserId,
            });
            onFriendAdded();
            onClose();
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-black">
                <h2 className="text-3xl font-bold mb-4 text-center font-bebas">Add a Friend</h2>

                {users.length === 0 ? (
                    <p className="text-center text-gray-700">No users available to add as friend.</p>
                ) : (
                    <select
                        className="w-full border border-black px-4 py-2 rounded mb-4"
                        value={selectedUserId || ""}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                    >
                        <option value="" disabled>
                            Select a user
                        </option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                )}

                <div className="flex justify-between mt-6">
                    <button
                        className="bg-[#D9534F] text-[#FFF6E5] hover:bg-[#C9302C] font-bold py-2 px-6 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={`${
                            selectedUserId ? "bg-[#7C3AED] hover:bg-[#6D28D9]" : "bg-gray-300 cursor-not-allowed"
                        } text-white font-bold py-2 px-6 rounded transition`}
                        onClick={handleAddFriend}
                        disabled={!selectedUserId}
                    >
                        Add Friend
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFriendModal;
