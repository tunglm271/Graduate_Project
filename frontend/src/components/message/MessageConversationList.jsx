import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Badge,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { fetchConversations } from "../../service/firebase/conversation";
import { getUser } from "../../utlis/auth";

const MessageConversationList = ({ onSelectConversation, selectedId }) => {
  const user = getUser();
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchConversations(setConversations, user.id);
    setLoading(false);
    return () => unsubscribe();
  }, []);

  const filteredConversations = conversations.filter((conv) => {
    const contactName =
      conv.members.find((member) => member.id !== user.id)?.name || "";
    return contactName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return format(date, "HH:mm", { locale: vi });
    } else if (diffDays === 1) {
      return "Hôm qua";
    } else if (diffDays < 7) {
      return format(date, "EEEE", { locale: vi });
    } else {
      return format(date, "dd/MM/yyyy", { locale: vi });
    }
  };

  if (loading) {
    return (
      <Box className="h-full flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="h-full flex flex-col">
      {/* Search Bar */}
      <Box className="p-4 border-b border-gray-200">
        <TextField
          fullWidth
          size="small"
          placeholder="Tìm kiếm cuộc trò chuyện..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          className="bg-gray-50"
        />
      </Box>

      {/* Conversation List */}
      <List className="flex-1 overflow-y-auto">
        {filteredConversations.map((conv) => {
          const contact = conv.members.find((member) => member.id !== user.id);
          return (
            <ListItem
              key={conv.id}
              button
              selected={selectedId === conv.id}
              onClick={() => onSelectConversation(conv)}
              className="hover:bg-gray-50"
            >
              <ListItemAvatar>
                <Badge
                  color={contact?.status === "online" ? "success" : "default"}
                  variant="dot"
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Avatar src={contact?.avatar} alt={contact?.name}>
                    {contact?.name?.charAt(0)}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className="font-medium truncate">
                    {contact?.name}
                  </Typography>
                }
                secondary={
                  <Box className="flex justify-between items-center">
                    <Typography
                      variant="body2"
                      className="text-gray-500 truncate max-w-[180px]"
                    >
                      {conv.lastMessage?.content || "Chưa có tin nhắn"}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-gray-400 ml-2 whitespace-nowrap"
                    >
                      {formatTimestamp(conv.lastMessage?.timestamp)}
                    </Typography>
                  </Box>
                }
              />
              {conv.unreadCount > 0 && (
                <Badge
                  badgeContent={conv.unreadCount}
                  color="primary"
                  className="ml-2"
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default MessageConversationList;
