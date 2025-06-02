import { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const CreateGroupModal = ({ onClose, onGroupAdded }) => {
    const [groupName, setGroupName] = useState("");

    const handleSubmit = async () => {
        if (!groupName.trim()) return;

        try {
            await api.post("/groups", { name: groupName });
            toast.success("Group added successfully!");
            onGroupAdded();
            onClose();
        } catch (error) {
            toast.error("Failed to add group");
            console.error("Error adding group:", error);
        }
    };

    const isDisabled = !groupName.trim();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] px-4">
            <div className="bg-[#FEF5E4] w-11/12 max-w-md p-6 rounded-lg shadow-lg relative">
                <h2 className="text-3xl font-bold mb-4 text-center font-bebas">
                    Create a Group
                </h2>

                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="border p-3 w-full rounded-md mb-6 text-[#030C03] text-lg font-medium"
                />

                <div className="flex flex-wrap justify-between gap-3">
                    <button
                        onClick={onClose}
                        className="bg-[#D9534F] text-[#FFF6E5] hover:bg-[#C9302C] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] px-6 py-2 rounded-md font-semibold text-lg transition w-full sm:w-auto"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className={`px-6 py-2 rounded-md font-semibold text-lg transition w-full sm:w-auto border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] ${
                            isDisabled
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-[#306B34] text-[#FFF6E5] hover:bg-[#265427]"
                        }`}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;
