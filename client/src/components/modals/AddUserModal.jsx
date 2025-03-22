import { useState } from "react";
import api from "../../utils/api";

const AddUserModal = ({ groupId, onClose }) => {
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddUser = async () => {
        setLoading(true);
        setError(null);
        try {
            await api.post(`/groups/${groupId}/users`, { userIds: [userId] });
            onClose();
        } catch (err) {
            setError("Failed to add user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-lg font-semibold mb-4 text-center">Add User to Group</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input 
                    type="number" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                    placeholder="Enter User ID" 
                    className="border p-2 w-full rounded-md"
                />

                <button 
                    onClick={handleAddUser} 
                    disabled={loading} 
                    className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full hover:bg-blue-600 transition"
                >
                    {loading ? "Adding..." : "Add User"}
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
