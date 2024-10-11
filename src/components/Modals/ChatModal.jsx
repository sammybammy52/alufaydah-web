import { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import Pusher from "pusher-js";

const ChatModal = ({ isOpen, onClose, vendor_id, vendor_img, storeName }) => {
  const { user } = useAuthContext();
  const { postRequest, handleNotify, getRequest } = useDataContext();
  const [loading, setLoading] = useState(false);
  //chat functionality
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    // Send the message using your preferred method (e.g., API call)
    // Once the message is successfully sent, update the messages state
    if (newMessage == "") {
      return toast.error("Please type a message");
    }
    const message = {
      sender_id: user?.id,
      receiver_id: vendor_id,
      content: newMessage,
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    // Clear the newMessage state
    setNewMessage("");

    const result = await postRequest("messages", message);
    if (result) {
    } else {
      toast.error("error sending message!");
    }
  };

  //ensure chat is always scrolled to the bottom
  const chatModalRef = useRef({});

  //scroll to bottom when we open chat modal
  const scrollToBottom = () => {
    setTimeout(() => {
      chatModalRef.current.scrollTop = chatModalRef.current.scrollHeight;
    }, 300);
  };
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to the bottom when the component updates
    scrollToBottom();
  }, [messages, vendor_id]);

  const getChatHistory = async (chatter, chatee) => {
    setLoading(true);
    const result = await getRequest(`chat-history/${chatter}/${chatee}`);
    if (result) {
      setMessages(result.chat_history);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!vendor_id || !user) {
      return;
    }
    getChatHistory(user?.id, vendor_id);
  }, [vendor_id]);

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher("e5ce4ebe92fc6d79d629", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe(`conversation-${user?.id}`);
    channel.bind("direct-message", function (result) {
      // alert(JSON.stringify(data));

      //ensure my channel is displaying the messages from the right person
      if (result.sender_id == vendor_id) {
        setMessages((prevMessages) => [...prevMessages, result]);
        toast.success("New Message");
        handleNotify(true);
      }
    });

    return () => {
      // Cleanup code if necessary
      channel.unbind("message");
      pusher.unsubscribe(`conversation-${user?.id}`);
    };
  }, [vendor_id]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_FULL_URL}/${
                    import.meta.env.VITE_IMAGE_URL
                  }/${vendor_img}`}
                  className="w-10 sm:w-10 h-10 sm:h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-xl mt-1 flex items-center">
                  <span className="text-gray-700 text-sm mr-3">
                    {storeName}
                  </span>
                </div>
                <span className="font-light text-xs text-gray-600">vendor</span>
              </div>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody ref={chatModalRef}>
            <div>
              <div
                id="messages"
                className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-x-hidden"
              >
                {loading && (
                  <div className="flex justify-center my-10">
                    <Spinner
                      className="text-primary"
                      speed="0.95s"
                      size={"lg"}
                      thickness={"3px"}
                    />
                  </div>
                )}
                {messages?.map((i) =>
                  i?.sender_id == user?.id ? (
                    <div className="chat-message">
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-primary text-white ">
                              {i.content}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="chat-message">
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                              {i.content}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </ModalBody>

          <ModalFooter justifyContent={"center"} width={"100%"}>
            <div className="border-t-2 border-gray-200 pt-4 mb-2 sm:mb-0">
              <form
                className="relative flex gap-4 justify-start"
                onSubmit={sendMessage}
              >
                <input
                  type="text"
                  placeholder="Write your message!"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
                />
                <div className=" items-center flex">
                  <button
                    type="button"
                    onClick={sendMessage}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-primary hover:translate-y-1 focus:outline-none"
                  >
                    <span className="font-bold">Send</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatModal;
