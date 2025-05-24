import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, TextField, Avatar, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const ChatContent = ({ conversation, onBack, isMobile }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "doctor",
      content: "Xin chào, tôi có thể giúp gì cho bạn?",
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: "patient",
      content: "Chào bác sĩ, tôi muốn hỏi về triệu chứng của tôi",
      timestamp: new Date(),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "patient",
          content: message.trim(),
          timestamp: new Date(),
        },
      ]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className="h-full flex flex-col">
      {/* Chat Header */}
      <Box className="flex items-center p-4 border-b border-gray-200 bg-white">
        {isMobile && (
          <IconButton onClick={onBack} className="mr-2">
            <ArrowBackIcon />
          </IconButton>
        )}
        <Avatar
          src={conversation?.avatar}
          alt={conversation?.name}
          className="w-10 h-10"
        />
        <Box className="ml-3">
          <Typography variant="subtitle1" className="font-semibold">
            {conversation?.name || "Bác sĩ"}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {conversation?.status || "Đang hoạt động"}
          </Typography>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <Box
            key={msg.id}
            className={`flex mb-4 ${
              msg.sender === "patient" ? "justify-end" : "justify-start"
            }`}
          >
            <Box
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === "patient"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <Typography variant="body1">{msg.content}</Typography>
              <Typography
                variant="caption"
                className={`block mt-1 ${
                  msg.sender === "patient" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {format(msg.timestamp, "HH:mm", { locale: vi })}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Box className="p-4 bg-white border-t border-gray-200">
        <Box className="flex items-center gap-2">
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            variant="outlined"
            size="small"
            className="bg-gray-50"
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContent;
