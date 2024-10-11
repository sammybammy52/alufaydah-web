import { createContext, useContext, useState, useEffect } from "react";
import Pusher from "pusher-js";
import { useAuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { Link} from "react-router-dom";

const ChatNotifyContext = createContext();

export default ChatNotifyContext;

export const ChatNotifyProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [refetchChat, setRefetchChat] = useState(false);

  const handleRefetchChat = () => {
    setRefetchChat(!refetchChat);
  };

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher("e5ce4ebe92fc6d79d629", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe(`conversation-${user?.id}`);
    channel.bind("chat-notification", function (result) {
      //alert(JSON.stringify(data));
      toast(`New message from ${result.sender_name}`);
      setRefetchChat(!refetchChat);
    });

    return () => {
      // Cleanup code if necessary
      channel.unbind("chat-notification");
      pusher.unsubscribe(`conversation-${user?.id}`);
    };
  }, [user]);

  let contextData = {
    refetchChat,
    handleRefetchChat,
  };

  return (
    <ChatNotifyContext.Provider value={contextData}>
      {children}
    </ChatNotifyContext.Provider>
  );
};

export const useChatNotifyContext = () => useContext(ChatNotifyContext);
