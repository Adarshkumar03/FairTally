import { useEffect, useState } from "react";
import api from "../../utils/api";

const AddUserModal = ({ groupId, onClose, onUsersAdded }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleUserSelection = (userId) => {
        setSelectedUserIds((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleAddUsers = async () => {
        if (selectedUserIds.length === 0) {
            setError("Please select at least one user.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await api.post(`/groups/${groupId}/users`, { userIds: selectedUserIds });
            onUsersAdded(); // Refresh group users list
            onClose();
        } catch (err) {
            setError("Failed to add users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-lg font-semibold mb-4 text-center">Add Users to Group</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                {/* User List with Checkboxes */}
                <div className="max-h-40 overflow-y-auto border p-2 rounded-md">
                    {users.length === 0 ? (
                        <p>No users found</p>
                    ) : (
                        users.map((user) => (
                            <label key={user.id} className="flex items-center gap-2 p-1">
                                <input
                                    type="checkbox"
                                    checked={selectedUserIds.includes(user.id)}
                                    onChange={() => handleUserSelection(user.id)}
                                />
                                {user.name}
                            </label>
                        ))
                    )}
                </div>

                <button
                    onClick={handleAddUsers}
                    disabled={loading}
                    className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full hover:bg-blue-600 transition"
                >
                    {loading ? "Adding..." : "Add Users"}
                </button>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default AddUserModal;
