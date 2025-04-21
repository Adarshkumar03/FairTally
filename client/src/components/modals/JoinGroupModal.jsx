import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const JoinGroupModal = ({ open, onClose, onGroupJoined }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    if (open) {
      api.get("/groups/potential")
        .then(response => setGroups(response.data))
        .catch(() => toast.error("Failed to load groups"));
    }
  }, [open]);

  const handleJoin = () => {
    if (!selectedGroupId) return;
    api.post(`/groups/${selectedGroupId}/join`)
      .then(() => {
        toast.success("Joined group successfully");
        onGroupJoined();
        onClose();
      })
      .catch(() => toast.error("Failed to join group"));
  };

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Join a Group</h2>
          <select
            className="w-full p-2 border rounded mb-4"
            onChange={(e) => setSelectedGroupId(e.target.value)}
            value={selectedGroupId || ""}
          >
            <option value="" disabled>Select a group</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 text-white rounded ${selectedGroupId ? "bg-green-600" : "bg-gray-300 cursor-not-allowed"}`}
              onClick={handleJoin}
              disabled={!selectedGroupId}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    )
  );
  
  
};

export default JoinGroupModal;
