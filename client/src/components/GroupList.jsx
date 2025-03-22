import { useNavigate } from "react-router";

const GroupList = ({ groups, selectedGroup, onSelectGroup, onAddGroup }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Groups</h2>
            
            {/* Add Group Button */}
            

            {groups.length === 0 ? (
                <p>No groups available</p>
            ) : (
                <ul>
                    {groups.map((group) => (
                        <li 
                            key={group.id} 
                            className={`p-2 border-b cursor-pointer ${selectedGroup?.id === group.id ? 'bg-gray-300' : ''}`}
                            onClick={() => {
                                onSelectGroup(group);
                                navigate(`/dashboard/groups/${group.id}`);
                            }}
                        >
                            {group.name}
                        </li>
                    ))}
                </ul>
            )}
            <button 
                onClick={onAddGroup} 
                className="w-full mb-4 bg-green-500 text-white p-2 rounded-md"
            >
                + Add Group
            </button>
        </div>
    );
};

export default GroupList;
