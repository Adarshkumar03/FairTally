import { useEffect, useState } from "react";
import api from "../../utils/api";

const AddUserModal = ({ groupId, onClose }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Fetch all users
            const allUsersRes = await api.get("/users");
            const allUsers = allUsersRes.data;

            // Fetch group members
            const groupRes = await api.get(`/groups/${groupId}`);
            const groupMembers = groupRes.data.users;

            // Filter out users who are already in the group
            const availableUsers = allUsers.filter(
                (user) => !groupMembers.some((member) => member.id === user.id)
            );

            setUsers(availableUsers);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users");
        }
    };

    const handleAddUsers = async () => {
        if (selectedUsers.length === 0) return;
        setLoading(true);
        setError(null);

        try {
            await api.post(`/group/${groupId}/users`, { userIds: selectedUsers });
            onClose();
        } catch (err) {
            setError("Failed to add users");
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
                <div className="max-h-40 overflow-y-auto">
                    {users.length === 0 ? (
                        <p className="text-gray-500 text-sm">No users available to add.</p>
                    ) : (
                        users.map((user) => (
                            <label key={user.id} className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    value={user.id}
                                    onChange={(e) => {
                                        const { checked, value } = e.target;
                                        setSelectedUsers((prev) =>
                                            checked ? [...prev, value] : prev.filter((id) => id !== value)
                                        );
                                    }}
                                    className="form-checkbox"
                                />
                                {user.name}
                            </label>
                        ))
                    )}
                </div>

                <button
                    onClick={handleAddUsers}
                    disabled={loading || selectedUsers.length === 0}
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
