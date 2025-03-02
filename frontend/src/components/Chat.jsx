import React, { useEffect, useState, useRef, useContext } from "react";
import Pusher from "pusher-js";
import api from "../service/api";
import { Divider, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"; // Icon emoji
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Cookies from 'js-cookie';
import { ChatMessage } from "./ChatMessage";
import { PatientLayoutContext } from "../context/PateintLayoutProvider";

const Chat = () => {
    const { toggleChatbox, setToggleChatbox } = useContext(PatientLayoutContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messageInputRef = useRef(null);
    const pickerRef = useRef(null);
    const userId = Cookies.get('user_id');
    const contactId = userId == 5 ? 4 : 5;

    useEffect(() => {
        api.get("/get-messages", { params: { contact: contactId } }).then((response) => {
            setMessages(response.data.messages || []);
        });
        const pusher = new Pusher("d9c184afb3717502398b", { cluster: "ap1" });
        const sortIds = [userId, contactId].sort((a, b) => a - b);
        const channel = pusher.subscribe("conversation." + sortIds[0] + "." + sortIds[1]);

        channel.bind("message", (data) => {
            const parsedData = JSON.parse(data.message);
            if (parsedData.user_id != userId) {
                setMessages((prevMessages) => [...prevMessages, parsedData]);
            }
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, []);

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

    const sendMessage = async () => {
        if (!input.trim()) return;
        const message = input.trim();
        const newMessage = {
            user_id: userId,
            message: message,
            username: Cookies.get('name'),
            avatar: Cookies.get('avatar'),
            sent_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        try {
            await api.post("/send-message", { message: input, contact: contactId });
            setInput("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const addEmoji = (emoji) => {
        setInput((prev) => prev + emoji.native);
    };

    return (
        <div className="chatbox" style={{ display: toggleChatbox ? "block" : "none" }}>
            <div className="chatbox-header">
                <h4>Chat App</h4>
                <IconButton sx={{ padding: "5px", color: "#007fbd" }} onClick={() => setToggleChatbox(false)}>
                    <CancelIcon sx={{ fontSize: "20px" }} />
                </IconButton>
            </div>
            <Divider />
            <div className="chatbox-body">
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
                            sendMessage();
                        }
                    }}
                />
                <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <InsertEmoticonIcon sx={{ fontSize: "20px", color: "#007fbd" }} />
                </IconButton>
                <IconButton onClick={sendMessage} sx={{ color: "#007fbd" }}>
                    <SendIcon sx={{ fontSize: "20px" }} />
                </IconButton>
            </div>
        </div>
    );
};

export default Chat;
