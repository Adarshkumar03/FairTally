import { useEffect, useState, useCallback } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const AddUserModal = ({ groupId, onClose, refreshGroupDetails }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get(`/groups/${groupId}/available-users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    }
  }, [groupId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUsers = async () => {
    if (selectedUsers.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      await api.post(`/groups/${groupId}/users`, { userIds: selectedUsers });
      refreshGroupDetails();
      onClose();
      toast.success("User added to group successfully!!");
    } catch {
      setError("Failed to add users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <div className="bg-[#FFF6E5] w-[400px] max-h-[500px] p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#030303]">
          Add Users to Group
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {selectedUsers.length > 0 && (
          <p className="text-lg text-[#030303] my-2 text-center">
            {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""}{" "}
            selected
          </p>
        )}
        <div className="max-h-60 overflow-y-auto bg-[#F7C236] p-3 rounded-md">
          {users.length === 0 ? (
            <p className="text-gray-700 text-sm text-center">
              No users available to add.
            </p>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-3 p-3 bg-[#FCEBB6] rounded-md transition-all hover:bg-[#f5d77a] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={user.id}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setSelectedUsers((prev) =>
                        checked
                          ? [...prev, value]
                          : prev.filter((id) => id !== value)
                      );
                    }}
                    className="form-checkbox w-5 h-5 accent-[#306B34] cursor-pointer"
                  />
                  <span className="text-[#030303] font-medium">
                    {user.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-[#909CC2] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-[#fbfbfb] px-4 py-2 rounded-md font-semibold hover:brightness-110 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleAddUsers}
            disabled={loading || selectedUsers.length === 0}
            className={`px-4 py-2 rounded-md font-semibold transition border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] ${
              selectedUsers.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#306B34] text-[#fbfbfb] hover:brightness-110"
            }`}
          >
            {loading ? "Adding..." : "Add Users"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
