import { Menu, SearchIcon } from 'lucide-react'
import messages from '../assets/Data/messages.json'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../Utils/useAuthStore'
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../Utils/firebase'

const ChatList = ({onChatSelect, setShowNav, setReceiverId}) => {
  const { user } = useAuthStore();
  const [conversations, setConversations ] = useState([]);

  useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, 'messages'),
    where('participants', 'array-contains', user.uid),
    orderBy('updatedAt', 'desc')
  );

  const unSub = onSnapshot(q, async (snapshot) => {
    const convos = await Promise.all(snapshot.docs.map(async (docSnap) => {
      const convo = docSnap.data();
      const id = docSnap.id;

      const otherUid = convo.participants.find(p => p !== user.uid);
      const userDoc = await getDoc(doc(db, 'users', otherUid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      

      return {
        id,
        ...convo,
        receiver: userData, 
      };
    }));
    setConversations(convos);
  });

  return () => unSub();
}, [user?.uid]);

  
  
  return (
    <div className='flex-1 mb-2 bg-[#fafafa] rounded-lg overflow-y-auto h-full'>
      <div className= 'flex items-center px-3 py-2 border-b border-gray-200'>
        <Menu 
        className='cursor-pointer lg:hidden'
        onClick={() => setShowNav(prev => !prev)} />
        <div className='flex flex-1 items-center gap-2 border border-blue-400 rounded-2xl bg-white py-2 px-3 m-4'>
        <SearchIcon className='text-blue-400' />
        <input type="text" className='flex-1 w-full focus:outline-none'/>
      </div>
      </div>
      <div className='flex flex-col h-[calc(100vh-100px)] overflow-y-auto'>
        {
          !conversations.length ? (
            <div className='flex items-center justify-center h-full'>
              <p className='text-gray-500'>No conversations found</p>
            </div>
          ) : conversations.map((message, i) => {
          const fullName = message.receiver?.uname
          const [ fname, lname ] = message.receiver?.uname.split(' ')
          const initials = fname[0].toUpperCase()+lname[0].toUpperCase() 


            return (
            <div className='flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg cursor-pointer transition-all border-b border-gray-200'onClick={() => {
              setReceiverId(message.receiver.uid);
              onChatSelect();
            }} key={i}>
  {/* Left: Avatar + Message Info */}
  <div className='flex items-center gap-4'>
    {/* Avatar */}
    <div className='w-14 h-14 bg-amber-300 rounded-full flex items-center justify-center text-white font-bold text-lg'>
      {initials}
    </div>

    {/* Name and Message */}
    <div className='flex flex-col'>
      <p className='text-sm font-semibold text-gray-800'>{fullName}</p>
      <span className='text-xs text-gray-500 truncate max-w-[200px]'>{message.lastMessage}</span>
    </div>
  </div>

  {/* Right: Unread Count + Time */}
  <div className='flex flex-col items-end gap-1'>
    {
      message.unseenCount?.[user.uid] > 0 && (
        <span className='text-xs bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-medium'>{message.unseenCount[user.uid]}</span>
      )
    }
    <span className='text-[11px] text-gray-400'>{message.updatedAt?.toDate().toLocaleTimeString() ?? ''}</span>
  </div>
</div>
          )
          } )
        }

      </div>
    </div>
  )
}

export default ChatList