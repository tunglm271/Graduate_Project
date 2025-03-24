import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
export const fetchConversations = (setConversations, userId) => {
  const ref = collection(db, "conversations");
  const q = query(ref, where("memberIds", "array-contains", userId ));
  return onSnapshot(q, (snapshot) => {
    setConversations(snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
  });
};
