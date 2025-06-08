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
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] px-4">
      <div className="bg-[#FFF6E5] w-11/12 max-w-md p-6 rounded-lg shadow-lg relative">
        <h2 className="text-3xl font-bold mb-2 text-center font-sora">
          Add Users to Group
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {selectedUsers.length > 0 && (
          <p className="text-lg text-[#030303] my-2 text-center">
            {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} selected
          </p>
        )}

        <div className="max-h-60 overflow-y-auto p-3 rounded-md">
          {users.length === 0 ? (
            <p className="text-gray-700 text-sm text-center">
              No users available to add.
            </p>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-3 p-3 bg-[#fef0c3] rounded-md transition-all hover:bg-[#fbd889] cursor-pointer"
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
                  <span className="text-[#030303] font-medium">{user.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-between flex-wrap gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-[#D9534F] text-[#FFF6E5] hover:bg-[#C9302C] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] px-6 py-3 rounded-md font-semibold w-full sm:w-auto hover:brightness-110 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleAddUsers}
            disabled={loading || selectedUsers.length === 0}
            className={`border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] px-6 py-3 rounded-md font-semibold w-full sm:w-auto transition ${
              selectedUsers.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
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
