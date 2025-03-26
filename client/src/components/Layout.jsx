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
        toast("Group added successfully!");
    };

    return (
        <div className="h-screen flex flex-col bg-[#FFF6E5]">
            {/* Top Navbar */}
            <UserNavbar />

            {/* Main Content */}
            <div className="grid grid-cols-4 flex-grow">
                {/* Left Sidebar (Groups List) */}
                <div className="col-span-1 bg-[#AAD7B8] p-6 border-r border-[#AAD7B8]">
                    <button
                        onClick={() => {
                            setSelectedGroup(null);
                            navigate("/dashboard");
                        }}
                        className="w-full bg-[#F7C236] text-black font-semibold py-2 rounded-lg shadow-md transition hover:brightness-110"
                    >
                        Go to Dashboard
                    </button>

                    <div className="mt-6">
                        {loading ? (
                            <p className="text-gray-700 text-center">Loading groups...</p>
                        ) : (
                            <GroupList
                                groups={groups}
                                selectedGroup={selectedGroup}
                                onSelectGroup={setSelectedGroup}
                                onAddGroup={() => setGroupModalOpen(true)}
                            />
                        )}
                    </div>
                </div>

                {/* Middle & Right Sections */}
                <div className="col-span-3 p-8 border-3">
                    <Outlet context={{ selectedGroup, groups, fetchGroups, setUserModalOpen }} />
                </div>
            </div>

            {/* Modals */}
            {isGroupModalOpen && (
                <AddGroupModal
                    onClose={() => setGroupModalOpen(false)}
                    onGroupAdded={handleGroupAdded}
                />
            )}
            {isUserModalOpen && (
                <AddUserModal groupId={selectedGroup?.id} onClose={() => setUserModalOpen(false)} />
            )}
        </div>
    );
};

export default Layout;
