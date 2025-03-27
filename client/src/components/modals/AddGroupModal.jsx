import { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const AddGroupModal = ({ onClose, onGroupAdded }) => {
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

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-[#FEF5E4] w-96 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-2xl font-bold text-center text-[#030C03]">Create a Group</h2>

                {/* Input */}
                <input 
                    type="text" 
                    value={groupName} 
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name" 
                    className="border p-2 w-full rounded-md mt-4 mb-3 text-[#030C03] text-lg font-medium"
                />

                {/* Action Buttons */}
                <div className="flex justify-between">
                    <button 
                        onClick={onClose} 
                        className="bg-[#D9534F] text-[#FFF6E5] hover:bg-[#C9302C] p-2 rounded-md font-semibold text-lg transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        className="bg-[#306B34] text-[#FFF6E5] p-2 rounded-md hover:bg-[#265427] transition font-semibold text-lg"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddGroupModal;
