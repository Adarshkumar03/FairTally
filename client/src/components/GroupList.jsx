import { useNavigate } from "react-router";

const GroupList = ({ groups, selectedGroup, onSelectGroup, onAddGroup }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Groups</h2>
            {groups.length === 0 ? (
                <p>No groups available</p>
            ) : (
                <ul className="mb-4">
                    {groups.map((group) => (
                        <li 
                            key={group.id} 
                            className={`p-2 cursor-pointer rounded-xs ${selectedGroup?.id === group.id ? 'bg-[#030C03] text-white' : ''}`}
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
                className="w-full mb-4 bg-[#306B34] text-[#fff] p-2 rounded-md font-semibold"
            >Add Group</button>
        </div>
    );
};

export default GroupList;
