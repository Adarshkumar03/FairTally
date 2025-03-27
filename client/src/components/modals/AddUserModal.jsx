import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const AddUserModal = ({ groupId, onClose, refreshGroupDetails }) => {
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
            await api.post(`/groups/${groupId}/users`, { userIds: selectedUsers });
            refreshGroupDetails();
            onClose();
            toast.success("User added to group successfully!!");
        } catch (err) {
            setError("Failed to add users");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-[#FFF6E5] w-80 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4 text-center text-[#030303]">Add Users to Group</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                {/* User List with Checkboxes */}
                <div className="max-h-40 overflow-y-auto bg-[#F7C236] p-2">
                    {users.length === 0 ? (
                        <p className="text-gray-500 text-sm">No users available to add.</p>
                    ) : (
                        users.map((user) => (
                            <label key={user.id} className="flex items-center gap-2 mb-2 text-[#030303]">
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
                <div className="flex justify-between">
                <button
                    onClick={handleAddUsers}
                    disabled={loading || selectedUsers.length === 0}
                    className="bg-[#306B34] text-[#fbfbfb] p-2 rounded-md mt-4 font-semibold"
                >
                    {loading ? "Adding..." : "Add Users"}
                </button>

                <button
                    onClick={onClose}
                    className= "bg-[#909CC2] text-[#fbfbfb] p-2 rounded-md mt-4 font-semibold"
                >
                    Cancel
                </button>
                </div>

                
            </div>
        </div>
    );
};

export default AddUserModal;
