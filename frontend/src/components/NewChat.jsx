import React, { useEffect, useState, useRef, useContext } from "react";
import { Divider, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import ChatMessage from "./ChatMessage";
import { fetchMessages, sendMessage } from "../service/firebase/message";
import AppContext from "../context/AppContext";

const NewChat = () => {
    const { chatbox, setChatbox } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messageInputRef = useRef(null);
    const pickerRef = useRef(null);
    const chatboxBodyRef = useRef(null);

    useEffect(() => {
        const unsubscribe = fetchMessages(chatbox?.contactId, setMessages);
        return () => unsubscribe();
    }, [chatbox]);

    useEffect(() => {
        if (chatboxBodyRef.current) {
            chatboxBodyRef.current.scrollTop = chatboxBodyRef.current.scrollHeight;
        }
    }, [messages]);  


    useEffect(() => {
        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        }
    
        if (showEmojiPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEmojiPicker]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
        messageInputRef.current.style.height = "auto";
        messageInputRef.current.style.height = messageInputRef.current.scrollHeight + "px";
    };

    const handleSendMessage = async () => {
       if (!input.trim()) return;
       await sendMessage({
              id: chatbox.contactId,
              name: chatbox.contactName,
              avatar: chatbox.avatar,
       }, input);
       setInput("");
    };

    const addEmoji = (emoji) => {
        setInput((prev) => prev + emoji.native);
    };

    return (
        <div className="chatbox" style={{ display: chatbox != null ? "block" : "none" }}>
            <div className="chatbox-header">
                <h4>{chatbox?.contactName || "Chat app"}</h4>
                <IconButton sx={{ padding: "5px", color: "#007fbd" }} onClick={() => setChatbox(null)}>
                    <CancelIcon sx={{ fontSize: "20px" }} />
                </IconButton>
            </div>
            <Divider />
            <div className="chatbox-body" ref={chatboxBodyRef}>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <ChatMessage message={msg} key={index} />
                        </li>
                    ))}
                </ul>
            </div>
            <Divider />
            <div className="chatbox-footer">

                {showEmojiPicker && (
                    <div style={{ position: "absolute", bottom: "60px", left: "10px", zIndex: 10 }} ref={pickerRef}>
                        <Picker data={data} onEmojiSelect={addEmoji} />
                    </div>
                )}

                <textarea
                    ref={messageInputRef}
                    rows={2}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Nhập tin nhắn..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <InsertEmoticonIcon sx={{ fontSize: "20px", color: "#007fbd" }} />
                </IconButton>
                <IconButton onClick={handleSendMessage} sx={{ color: "#007fbd" }}>
                    <SendIcon sx={{ fontSize: "20px" }} />
                </IconButton>
            </div>
        </div>
    );
};

export default NewChat;
