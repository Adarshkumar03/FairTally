import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import GroupList from "./GroupList";
import UserNavbar from "./UserNavbar";
import AddGroupModal from "./modals/AddGroupModal";
import AddUserModal from "./modals/AddUserModal";
import api from "../utils/api";
import { toast } from "react-toastify";

const Layout = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [isGroupModalOpen, setGroupModalOpen] = useState(false);
    const [isUserModalOpen, setUserModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await api.get("/groups");
            setGroups(response.data);
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGroupAdded = (newGroup) => {
        setGroups((prevGroups) => [...prevGroups, newGroup]);
        setGroupModalOpen(false);
        toast("Group added successfully!!") 
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Top Navbar */}
            <UserNavbar />

            {/* Main Content */}
            <div className="grid grid-cols-4 flex-grow">
                {/* Left Sidebar (Groups List) */}
                <div className="col-span-1 bg-[#070d2d] text-[#fbfbfc] p-4">
                <button 
                        onClick={() => {
                            setSelectedGroup(null);
                            navigate("/dashboard");
                        }}
                        className="w-full mt-4 mb-4 bg-linear-65 from-[#9920e3] to-[#2f1b80] text-[#fbfbfb] font-bold p-2 rounded-md"
                    >
                        Go to Dashboard
                    </button>
                    {loading ? (
                        <p>Loading groups...</p>
                    ) : (
                        <GroupList 
                            groups={groups} 
                            selectedGroup={selectedGroup} 
                            onSelectGroup={setSelectedGroup}
                            onAddGroup={() => setGroupModalOpen(true)} // Open Add Group Modal
                        />
                    )}
                    
                    {/* "Go to Dashboard" Button */}
                    
                </div>

                {/* Middle & Right Sections */}
                <div className="col-span-3 p-6 bg-[#141f45] ">
                    <Outlet context={{ selectedGroup, groups, fetchGroups, setUserModalOpen}} />
                </div>
            </div>

            {/* Modals */}
            {isGroupModalOpen && (
    <AddGroupModal 
        onClose={() => setGroupModalOpen(false)} 
        onGroupAdded={handleGroupAdded} 
    />
)}
            {isUserModalOpen && <AddUserModal groupId={selectedGroup?.id} onClose={() => setUserModalOpen(false)} />}
        </div>
    );
};

export default Layout;
