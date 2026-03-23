import { Menu, PlusIcon, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../Utils/useAuthStore'
import { collection, doc, getDoc, onSnapshot, query, where, orderBy, updateDoc } from 'firebase/firestore'
import { db } from '../Utils/firebase'

const ChatList = ({ onChatSelect, setShowNav, setReceiverId, activeReceiverId }) => {
  const { user } = useAuthStore()
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    if (!user) return
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', user.uid),
      orderBy('updatedAt', 'desc')
    )

    const unSub = onSnapshot(q, async (snapshot) => {
      const convos = await Promise.all(snapshot.docs.map(async (docSnap) => {
        const convo = docSnap.data()
        const otherUid = convo.participants.find(p => p !== user.uid)
        const userDoc = await getDoc(doc(db, 'users', otherUid))
        return { id: docSnap.id, ...convo, receiver: userDoc.exists() ? userDoc.data() : { uid: otherUid, uname: 'Unknown User' } }
      }))
      setConversations(convos)
    })
    return () => unSub()
  }, [user?.uid])

  const handleChatSelect = async (message) => {
    setReceiverId(message.receiver.uid)
    onChatSelect()
    const convoRef = doc(db, 'messages', message.id)
    await updateDoc(convoRef, { [`unseenCount.${user.uid}`]: 0 })
  }

  return (
    <div className='flex flex-col h-full bg-[#F8FAFC] border-r border-slate-200'>
      {/* Search Header */}
      <div className='p-6 pb-2'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-xl font-bold text-slate-900'>Messages</h1>
         
        </div>
        
        <div className='flex items-center gap-3'>
          <Menu className='lg:hidden cursor-pointer text-slate-600' onClick={() => setShowNav(true)} />
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4' />
            <input 
              type="text" 
              placeholder="Search..."
              className='w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10'
            />
          </div>
        </div>
      </div>

      {/* List */}
      <div className='flex-1 overflow-y-auto px-2'>
        {conversations.map((message) => {
          const isActive = activeReceiverId === message.receiver.uid
          const initials = message.receiver.uname?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'
          
          return (
            <div 
              key={message.id}
              onClick={() => handleChatSelect(message)}
              className={`flex items-center gap-3 p-3 mb-1 rounded-xl cursor-pointer transition-colors ${
                isActive ? 'bg-white shadow-sm border border-slate-100' : 'hover:bg-slate-100'
              }`}
            >
              <div className='w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-sm shrink-0'>
                {initials}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-baseline'>
                  <p className='text-sm font-semibold text-slate-900 truncate'>{message.receiver.uname}</p>
                  <span className='text-[10px] text-slate-400'>
                    {message.updatedAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='text-xs text-slate-500 truncate'>{message.lastMessage}</p>
                  {message.unseenCount?.[user.uid] > 0 && (
                    <span className='bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center'>
                      {message.unseenCount[user.uid]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChatList