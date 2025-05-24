import { useState } from "react";
import { Paper, useTheme, useMediaQuery } from "@mui/material";
import MessageConversationList from "../components/message/MessageConversationList";
import ChatContent from "../components/chat/ChatContent";

const MessagePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Conversation List - Left Side */}
      <div
        className={`border-r border-gray-200 ${
          isMobile && !selectedConversation ? "w-full" : "w-1/3"
        } ${isMobile && selectedConversation ? "hidden" : "block"}`}
      >
        <MessageConversationList
          onSelectConversation={setSelectedConversation}
          selectedId={selectedConversation?.id}
        />
      </div>

      {/* Chat Content - Right Side */}
      <div
        className={`${isMobile && !selectedConversation ? "hidden" : "block"} ${
          isMobile ? "w-full" : "w-2/3"
        }`}
      >
        {selectedConversation ? (
          <ChatContent
            conversation={selectedConversation}
            onBack={() => setSelectedConversation(null)}
            isMobile={isMobile}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Chọn một cuộc trò chuyện để bắt đầu</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
