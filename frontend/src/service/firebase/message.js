import { addDoc, collection, serverTimestamp, doc, updateDoc, orderBy, query, onSnapshot, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getUser } from "../../utlis/auth";

export const sendMessage = async (contact, text) => {
  const user = getUser();
  if (!user || !contact.id) return;

  const conversationsRef = collection(db, "conversations");

  // 🔎 Tìm xem đã có cuộc trò chuyện giữa currentUser và contactId chưa
  const q = query(conversationsRef, where("memberIds", "array-contains", user.id));
  const snapshot = await getDocs(q);
  
  let conversationId = null;

  for (const doc of snapshot.docs) {
    const conversation = doc.data();
    if (conversation.memberIds.includes(contact.id)) {
      conversationId = doc.id;
      break;
    }
  }

  // 🔹 Nếu chưa có cuộc trò chuyện -> tạo mới
  if (!conversationId) {
    const newConversation = {
      memberIds: [user.id, contact.id],
      members: [
        { id: user.id, name: user.name, avatar: user.avatar },
        { id: contact.id, name: contact?.name, avatar: contact?.avatar || "Không có" }, // Placeholder (có thể lấy từ user database)
      ],
      lastMessage: text,
      updatedAt: serverTimestamp(),
    };

    const newConversationRef = await addDoc(conversationsRef, newConversation);
    conversationId = newConversationRef.id;
  }

  // 🔹 Gửi tin nhắn vào cuộc trò chuyện
  const messagesRef = collection(db, `conversations/${conversationId}/messages`);
  await addDoc(messagesRef, {
    senderId: user.id,
    senderName: user.name,
    senderAvatar: user.avatar,
    content: text,
    sent_at: serverTimestamp(),
  });

  // 🔹 Cập nhật tin nhắn cuối cùng trong danh sách hội thoại
  const conversationRef = doc(db, "conversations", conversationId);
  await updateDoc(conversationRef, {
    lastMessage: text,
    updatedAt: serverTimestamp(),
  });
  return conversationId;
};



export const fetchMessages = (contactId, setMessages) => {
  const user = getUser();
  if (!user || !contactId) return () => {}; 

  const conversationsRef = collection(db, "conversations");
  const q = query(conversationsRef, where("memberIds", "array-contains", user.id));

  let unsubscribe = () => {}; 

  getDocs(q).then((snapshot) => {
    let conversationId = null;

    for (const doc of snapshot.docs) {
      const conversation = doc.data();
      if (conversation.memberIds.includes(contactId)) {
        conversationId = doc.id;
        break;
      }
    }

    if (!conversationId) {
      return;
    }

    // 🔹 Lắng nghe tin nhắn trong cuộc trò chuyện
    const messagesRef = collection(db, `conversations/${conversationId}/messages`);
    const messagesQuery = query(messagesRef, orderBy("sent_at", "asc"));

    unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            sent_at: data.sent_at
              ? new Date(data.sent_at.seconds * 1000).toLocaleString()
              : "N/A",
          };
        })
      );
    });
  });

  return () => unsubscribe();
};