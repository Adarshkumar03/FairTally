import { useState } from "react";
import api from "../../utils/api";

const AddGroupModal = ({ onClose }) => {
    const [name, setName] = useState("");

    const handleSubmit = async () => {
        if (!name.trim()) return;
        await api.post("/groups", { name });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg relative">
                <h2 className="text-lg font-semibold mb-4 text-center">Create New Group</h2>

                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Group Name" 
                    className="border p-2 w-full rounded-md"
                />

                <button 
                    onClick={handleSubmit} 
                    className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full hover:bg-blue-600 transition"
                >
                    Create
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

export default AddGroupModal;
