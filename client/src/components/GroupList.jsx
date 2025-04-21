const GroupList = ({ groups, selectedGroup, onSelectGroup, onAddGroup, onJoinGroup }) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-center font-bebas tracking-wide">Groups</h2>
        {groups.length === 0 ? (
          <p className="font-semibold text-center text-[#030303] mb-4">No groups available</p>
        ) : (
          <ul className="mb-4 space-y-2">
            {groups.map((group) => (
              <li 
                key={group.id} 
                className={`p-3 rounded-md cursor-pointer transition-all duration-300 border-3 border-[#030C03] text-[#030C03] font-semibold 
                  ${selectedGroup?.id === group.id 
                    ? "bg-[#030C03] text-white font-bold border-[#030C03]" 
                    : "bg-[#AAD7B8] hover:bg-[#030C03] hover:text-white"
                  }`}
                onClick={() => onSelectGroup(group)}
              >
                {group.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button 
          onClick={onAddGroup}
          className="w-full bg-[#F7C236] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-black p-2 rounded-md font-semibold hover:brightness-110 transition-all duration-300"
        >
          Create Group
        </button>

        <button 
          onClick={onJoinGroup}
          className="w-full bg-[#306B34] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-white p-2 rounded-md font-semibold hover:bg-[#245824] transition-all duration-300"
        >
          Join Group
        </button>
      </div>
    </div>
  );
};

export default GroupList;
