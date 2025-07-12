import { create } from "zustand";
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  increment,
  arrayUnion,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from './firebase'

const getConversationId = (uid1, uid2) => {
  return [uid1, uid2].sort().join('_')
}

export const useMessageStore = create((set, get) => ({
    messages : [],
    unSubscribe: null,
    
    sendMessage: async ({ senderId, receiverId, text, type = 'text', metadata = {} }) => {
    const conversationId = getConversationId(senderId, receiverId)
    const convoRef = doc(db, 'messages', conversationId)
    const messagesRef = collection(convoRef, 'messages')

    // Ensure conversation exists
    const convoSnap = await getDoc(convoRef)
    if (!convoSnap.exists()) {
      await setDoc(convoRef, {
        participants: [senderId, receiverId],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessage: text,
        lastSender: senderId,
        unseenCount: {
          [senderId]: 0,
          [receiverId]: 1
        }
      })
    } else {
      await updateDoc(convoRef, {
        lastMessage: text,
        lastSender: senderId,
        updatedAt: serverTimestamp(),
        [`unseenCount.${receiverId}`]: increment(1)
      })
    }

    // Add the message
    await addDoc(messagesRef, {
      senderId,
      receiverId,
      text,
      type,
      createdAt: serverTimestamp(),
      seenBy: [senderId],
      metadata
    })
  },

  fetchMessages: (uid1, uid2) => {
    const conversationId = getConversationId(uid1, uid2)
    const messagesRef = collection(db, 'messages', conversationId, 'messages')
    const q = query(messagesRef, orderBy('createdAt', 'asc'))

    // Cleanup existing listener
    const currentUnsub = get().unsubscribe
    if (currentUnsub) currentUnsub()

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      set({ messages: msgs })
    })

    set({ unsubscribe: unsub })
  },

  clearMessages: () => {
    const unsub = get().unsubscribe
    if (unsub) unsub()
    set({ messages: [], unsubscribe: null })
  }

}))