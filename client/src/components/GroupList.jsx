// import useGroupStore from "../store/useGroupStore";

const GroupList = ({ onAddGroup }) => {
    // const { groups } = useGroupStore();

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Groups</h2>
            <ul>
                {/* {groups.map(group => (
                    <li key={group.id} className="p-2 border-b">{group.name}</li>
                ))} */}
            </ul>
            <button onClick={onAddGroup} className="mt-4 w-full bg-blue-500 text-white p-2 rounded">+ Add Group</button>
        </div>
    );
};

export default GroupList;
