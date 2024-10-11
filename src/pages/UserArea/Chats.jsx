import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useAuthContext } from "../../context/AuthContext";
import { useChatNotifyContext } from "../../context/ChatNotifyContext";
import { useDataContext } from "../../context/DataContext";
import ChatListComponent from "../../components/MiniComponents/ChatListComponent";
import Pusher from "pusher-js";
import { toast } from "react-toastify";

const Chats = () => {
  const { user } = useAuthContext();
  const { refetchChat } = useChatNotifyContext();
  const { getRequest, refetchHelp } = useDataContext();
  const [recentChats, setRecentChats] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [readChats, setReadChats] = useState([]);

  const getRecentChats = async (id) => {
    const result = await getRequest(`recent-chats`);
    if (result) {
      setRecentChats(null);
      setReadChats([]);
      setRecentChats(result.data);
    }
  };

  useEffect(() => {
    getRecentChats(user.id);
  }, []);

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher("e5ce4ebe92fc6d79d629", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe(`conversation-${user?.id}`);
    channel.bind("recent-chats", function (result) {
      // toast.success("Hello, new recent chats!!!!")
      let recents = recentChats;
      let newArray = [];

      for (let i = 0; i < recents.length; i++) {
        const element = recents[i];

        if (element.id !== Number(result.id)) {
          newArray.push(element);
        }
      }

      setRecentChats([result, ...newArray]);
    });

    return () => {
      // Cleanup code if necessary
      channel.unbind("recent-chats");
      pusher.unsubscribe(`conversation-${user?.id}`);
    };
  }, [user, recentChats]);

  const handleRead = (data) => {
    let recents = recentChats;
    console.log("recents old");
    console.log(recents);
    let index = recents.findIndex((i) => i.id === data.id);
    console.log();
    recents[index] = data;
    console.log("recents new");
    console.log(recents);
    setRecentChats(recents);
  };

  return (
    <>
      <Dashboard>
        <h1 className="mb-5">Recent Chats</h1>

        <div>
          <div>
            {recentChats?.map((i, index) => (
              <ChatListComponent key={index} data={i} handleRead={handleRead} />
            ))}
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default Chats;
