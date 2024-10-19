import { useState } from "react";
import friendsList from "./friends.json";
import FormSplitBill from "./components/FormSplitBill";
import FriendListCard from "./components/FriendListCard";
import FormAddFriend from "./components/FormAddFriend";

function App() {
    const [friends, setFriends] = useState(friendsList);
    const [showAddFriend, setShowFriend] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleShowAddFriend = () => setShowFriend((prev) => !prev);

    const onAddNewFriend = (friend) => {
        setFriends((prevFriends) => [...prevFriends, friend]);
    };

    function onSelectedFriend(friend) {
        setSelectedFriend((selected) =>
            selected?.id === friend.id ? null : friend
        );
        setShowFriend(false);
    }

    function handleSplitBill(value) {
        setFriends((prevFriends) =>
            prevFriends.map((friend) =>
                friend.id === selectedFriend?.id
                    ? { ...friend, balance: friend.balance + value }
                    : friend
            )
        );
        setSelectedFriend(null);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendListCard
                    friends={friends}
                    onSelectedFriend={onSelectedFriend}
                    selectedFriend={selectedFriend}
                />
                {showAddFriend && <FormAddFriend onAddNewFriend={onAddNewFriend} />}
                <button className="button" onClick={handleShowAddFriend}>
                    {showAddFriend ? "Tutup" : "Tambah Teman"}
                </button>
            </div>
            {selectedFriend && (
                <FormSplitBill
                    selectedFriend={selectedFriend}
                    handleSplitBill={handleSplitBill}
                />
            )}
        </div>
    );
}

export default App;
