import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { Send, X, ChevronLeft } from 'lucide-react';

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);
  const notificationCount = useNotificationStore((state) => state.count);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="flex h-[600px] rounded-lg overflow-hidden shadow-lg">
      <div className={`w-full bg-white border-gray-200 ${chat ? 'hidden md:block md:w-1/3' : ''}`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
          {notificationCount > 0 && (
            <div className="inline-block bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ml-2">
              {notificationCount}
            </div>
          )}
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {chats?.map((c) => (
            <div
              key={c.id}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                !c.seenBy.includes(currentUser.id) && chat?.id !== c.id
                  ? "bg-yellow-50"
                  : ""
              }`}
              onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img
                src={c.receiver.avatar || "/noavatar.png"}
                alt=""
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {c.receiver.username}
                </p>
                <p className="text-sm text-gray-500 truncate">{c.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {chat && (
        <div className={`w-full flex flex-col bg-white ${chat ? 'md:w-2/3 right' : 'hidden'}`}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setChat(null)}
                className="md:hidden mr-2 text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft size={24} />
              </button>
              <img
                src={chat.receiver.avatar || "/noavatar.png"}
                alt=""
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <span className="text-lg font-semibold text-gray-800">
                {chat.receiver.username}
              </span>
            </div>
            <button
              onClick={() => setChat(null)}
              className="hidden md:block text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.userId === currentUser.id ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                    message.userId === currentUser.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {format(message.createdAt)}
                </span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <textarea
                name="text"
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="1"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-150"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;