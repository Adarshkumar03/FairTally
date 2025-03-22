import { useState, useEffect } from "react";
import api from "../utils/api";

const GroupMembers = ({ groupId }) => {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState("");

    // useEffect(() => {
    //     if (groupId) fetchMembers();
    // }, [groupId]);

    const fetchMembers = async () => {
        try {
            const response = await api.get(`/groups/${groupId}/members`);
            setMembers(response.data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    const handleAddMember = async () => {
        if (!newMember.trim()) return;
        try {
            await api.post(`/groups/${groupId}/members`, { name: newMember });
            setNewMember("");
            fetchMembers();
        } catch (error) {
            console.error("Error adding member:", error);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Group Members</h2>
            <ul>
                {members.map((member) => (
                    <li key={member.id} className="p-2 border-b">{member.name}</li>
                ))}
            </ul>
            <div className="mt-4 flex">
                <input 
                    type="text" 
                    value={newMember} 
                    onChange={(e) => setNewMember(e.target.value)} 
                    placeholder="Enter user name" 
                    className="border p-2 flex-1"
                />
                <button onClick={handleAddMember} className="ml-2 bg-blue-500 text-white p-2 rounded">
                    Add
                </button>
            </div>
        </div>
    );
};

export default GroupMembers;
