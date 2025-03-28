import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import GroupList from "./GroupList";
import UserNavbar from "./UserNavbar";
import AddGroupModal from "./modals/AddGroupModal";
import api from "../utils/api";

const Layout = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGroupModalOpen, setGroupModalOpen] = useState(false);

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

    const handleGroupAdded = async (newGroup) => {
        try {
            await fetchGroups();
            setSelectedGroup(newGroup);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating groups:", error);
        } finally {
            setGroupModalOpen(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-[#FFF6E5] p-0 m-0">
            {/* Top Navbar */}
            <UserNavbar />

            {/* Main Content */}
            <div className="grid grid-cols-4 flex-grow mt-15">
                {/* Left Sidebar (Groups List) */}
                <div className="col-span-1 bg-[#AAD7B8] p-6 border-r border-[#AAD7B8]">
                    <button
                        onClick={() => {
                            setSelectedGroup(null);
                            navigate("/dashboard");
                        }}
                        className="w-full bg-[#F7C236] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-black font-bold py-2 rounded-md shadow-md hover:brightness-110 transition duration-300"
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
                <div className="col-span-3 p-8 border-4 bg-[#FFF6E5] min-h-[calc(100vh-4rem)]">
                    <Outlet context={{ selectedGroup, groups, fetchGroups }} />
                </div>
            </div>

            {/* Modals */}
            {isGroupModalOpen && (
                <AddGroupModal
                    onClose={() => setGroupModalOpen(false)}
                    onGroupAdded={handleGroupAdded}
                />
            )}
        </div>
    );
};

export default Layout;
