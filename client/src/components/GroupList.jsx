import { useNavigate } from "react-router";

const GroupList = ({ groups, selectedGroup, onSelectGroup, onAddGroup }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Groups</h2>
            {groups.length === 0 ? (
                <p>No groups available</p>
            ) : (
                <ul className="mb-4">
                    {groups.map((group) => (
                        <li 
                            key={group.id} 
                            className={`p-2 cursor-pointer rounded-md ${selectedGroup?.id === group.id ? 'bg-[#141f45]' : ''}`}
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
                className="w-full mb-4 bg-linear-65 from-[#57bc4d] to-[#398c31] text-[#fbfbfb] p-2 rounded-md font-bold"
            >Add Group</button>
        </div>
    );
};

export default GroupList;
