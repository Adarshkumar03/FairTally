import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import GroupList from "./GroupList";
import FriendList from "./FriendList";
import UserNavbar from "./UserNavbar";
import CreateGroupModal from "./modals/CreateGroupModal";
import AddFriendModal from "./modals/AddFriendModal";
import JoinGroupModal from "./modals/JoinGroupModal";
import api from "../utils/api";

const Layout = () => {
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);
  const [isFriendModalOpen, setFriendModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const [refreshTx, setRefreshTx] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
    fetchFriends();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoadingGroups(false);
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await api.get("/friends");
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoadingFriends(false);
    }
  };

  const handleFriendAdded = async () => {
    await fetchFriends();
    setFriendModalOpen(false);
  };

  const handleGroupAdded = async (newGroup) => {
    try {
      await fetchGroups();
      setSelectedGroup(newGroup);
      setSelectedFriend(null);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating groups:", error);
    } finally {
      setGroupModalOpen(false);
    }
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setSelectedGroup(null);
    navigate(`/dashboard/friends/${friend.id}`);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setSelectedFriend(null);
    navigate(`/dashboard/groups/${group.id}`);
  };

  return (
    <div className="h-screen flex flex-col bg-[#FDF2E5] p-0 m-0">
      <header>
        <UserNavbar />
      </header>

      <main className="flex flex-grow flex-col md:grid md:grid-cols-4 mt-14">
        <aside className="md:col-span-1 bg-[#AAD7B8] p-6 border-r border-[#AAD7B8] min-h-[80px] md:min-h-screen overflow-y-auto">
          <button
            onClick={() => {
              setSelectedGroup(null);
              setSelectedFriend(null);
              navigate("/dashboard");
            }}
            className="w-full bg-[#306B34] border-l-2 border-t-2 border-r-4 border-b-4 border-[#030303] text-white font-bold py-2 rounded-md shadow-md hover:brightness-110 hover:bg-[#2b5c31] transition duration-300"
          >
            Go to Dashboard
          </button>

          <section className="mt-6">
            <h2 className="text-3xl font-bold mb-4 text-center font-bebas tracking-wide">Friends</h2>
            {loadingFriends ? (
              <p className="text-gray-700 text-center">Loading friends...</p>
            ) : (
              <FriendList
                friends={friends}
                selectedFriend={selectedFriend}
                onSelectFriend={handleFriendSelect}
                onAddFriend={() => setFriendModalOpen(true)}
              />
            )}
          </section>

          <section className="mt-6">
            {loadingGroups ? (
              <p className="text-gray-700 text-center">Loading groups...</p>
            ) : (
              <GroupList
                groups={groups}
                selectedGroup={selectedGroup}
                onSelectGroup={handleGroupSelect}
                onAddGroup={() => setGroupModalOpen(true)}
                onJoinGroup={() => setJoinModalOpen(true)}
              />
            )}
          </section>
        </aside>

        <section className="md:col-span-3 p-8 border-t-4 border-l-4 bg-[#FFF6E5] min-h-[calc(100vh-4rem)] flex flex-col">
          <Outlet context={{ selectedGroup, selectedFriend, groups, friends, fetchGroups, fetchFriends, refreshTx, setRefreshTx }} />
        </section>
      </main>

      {isGroupModalOpen && (
        <CreateGroupModal
          onClose={() => setGroupModalOpen(false)}
          onGroupAdded={handleGroupAdded}
        />
      )}
      {isFriendModalOpen && (
        <AddFriendModal
          onClose={() => setFriendModalOpen(false)}
          onFriendAdded={handleFriendAdded}
        />
      )}
      {isJoinModalOpen && (
        <JoinGroupModal
          open={isJoinModalOpen}
          onClose={() => setJoinModalOpen(false)}
          onGroupJoined={fetchGroups}
        />
      )}
    </div>
  );
};

export default Layout;
