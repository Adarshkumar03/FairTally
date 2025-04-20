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
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md border-black">
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

                <div className="flex justify-end gap-4">
                    <button
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[#F7C236] hover:brightness-110 border-black border-2 text-black font-bold py-2 px-4 rounded"
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
