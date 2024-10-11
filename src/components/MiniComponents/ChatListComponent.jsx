import { useState } from "react";
import { Avatar, useDisclosure } from "@chakra-ui/react";
import { formatTimeAgo, truncateString } from "../../utils/Helpers";
import { IoCheckmarkDone } from "react-icons/io5";
import ChatModal from "../../components/Modals/ChatModal";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";

const ChatListComponent = ({ data, handleRead }) => {
  const { getRequest } = useDataContext();
  const { user } = useAuthContext();
  const [recipient, setRecipient] = useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const getName = (data) => {
    if (data?.user1?.id === user?.id) {
      return `${data?.user2?.firstName} ${data?.user2?.lastName}`;
    }
    return `${data?.user1?.firstName} ${data?.user1?.lastName}`;
  };
  const getImage = (data) => {
    if (data?.user1?.id === user?.id) {
      return `${import.meta.env.VITE_FULL_URL}/${
        import.meta.env.VITE_IMAGE_URL
      }/${data?.user2?.storeImg}`;
    }
    return `${import.meta.env.VITE_FULL_URL}/${
      import.meta.env.VITE_IMAGE_URL
    }/${data?.user1?.storeImg}`;
  };

  const handleOpenChat = (data) => {
    getRequest(`read-chat/${data?.id}`);
    handleRead({ ...data, isRead: 1 });
    if (data?.user1?.id === user?.id) {
      onOpen();
      return setRecipient(data?.user2);
    }
    onOpen();
    return setRecipient(data?.user1);
  };
  return (
    <>
      {isOpen && (
        <ChatModal
          isOpen={isOpen}
          onClose={onClose}
          vendor_id={recipient?.id}
          vendor_img={recipient?.storeImg}
          storeName={recipient?.storeName}
        />
      )}
      <div
        onClick={() => handleOpenChat(data)}
        className="border-b py-2 px-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 hover:rounded-lg"
      >
        <Avatar name={getName(data)} src={getImage(data)} />

        <div className=" w-full flex items-start justify-between">
          <div>
            <h4 className="font-semibold mb-2">{getName(data)}</h4>

            <div className="flex items-center gap-3">
              {data?.last_sender === user?.id ? (
                <IoCheckmarkDone className="text-gray-500" />
              ) : (
                <span className="bg-primary h-2 w-2 rounded-full"></span>
              )}
              <p className="text-gray-500 text-sm">
                {truncateString(data?.last_message, 20)}
              </p>
            </div>
          </div>

          <div className=" flex flex-col items-end">
            <p className="text-sm text-gray-500">
              {formatTimeAgo(data?.updated_at)}
            </p>
            {!data?.isRead && data?.last_sender !== user?.id ? (
              <span className="py-[2px] px-2 bg-red-600 rounded-lg text-white text-xs">
                new
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatListComponent;
