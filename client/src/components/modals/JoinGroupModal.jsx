import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const JoinGroupModal = ({ open, onClose, onGroupJoined }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    if (open) {
      api
        .get("/groups/potential")
        .then((response) => setGroups(response.data))
        .catch(() => toast.error("Failed to load groups"));
    }
  }, [open]);

  const handleJoin = () => {
    if (!selectedGroupId) return;
    api
      .post(`/groups/${selectedGroupId}/join`)
      .then(() => {
        toast.success("Joined group successfully");
        onGroupJoined();
        onClose();
      })
      .catch(() => toast.error("Failed to join group"));
  };

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] px-4">
        <div className="bg-[#FEF5E4] w-11/12 max-w-md p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center font-bebas">
            Join a Group
          </h2>

          <select
            className="w-full p-3 border rounded-md mb-6 text-[#030C03] text-lg"
            onChange={(e) => setSelectedGroupId(e.target.value)}
            value={selectedGroupId || ""}
          >
            <option value="" disabled>
              Select a group
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          <div className="flex justify-between flex-wrap gap-3">
            <button
              onClick={onClose}
              className="bg-[#D9534F] text-[#FFF6E5] hover:bg-[#C9302C] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] px-6 py-2 rounded-md font-semibold text-lg w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleJoin}
              disabled={!selectedGroupId}
              className={`${
                selectedGroupId
                  ? "bg-[#306B34] hover:bg-[#265427] text-[#FFF6E5]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] px-6 py-2 rounded-md font-semibold text-lg w-full sm:w-auto transition`}
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
