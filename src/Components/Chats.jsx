import { ArrowLeft, MessageSquareDashed, MoreVertical, Phone, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../Utils/firebase'
import MessagesContainer from './MessagesContainer'
import MessageIcons from './MessageIcons'

const Chats = ({ onBack, receiverId, showChats }) => {
  const [receiver, setReceiver] = useState(null)

  useEffect(() => {
    if (!receiverId) return
    const fetchUser = async () => {
      const snap = await getDoc(doc(db, 'users', receiverId))
      if (snap.exists()) setReceiver(snap.data())
    }
    fetchUser()
  }, [receiverId])

  if (!receiverId) return (
    <div className='hidden lg:flex flex-1 flex-col items-center justify-center bg-white h-full'>
      <div className='flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300'>
        <div className='w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center'>
          <MessageSquareDashed size={40} className='text-slate-300' />
        </div>
        <div className='text-center'>
          <h3 className='text-slate-900 font-semibold'>No conversation selected</h3>
          <p className='text-slate-400 text-sm max-w-[200px] mt-1'>
            Pick a contact from the list to start messaging.
          </p>
        </div>
      </div>
    </div>
  )

  const initials = receiver?.uname?.split(' ').map(n => n[0]).join('').toUpperCase() || ''

  return (
    <div className={`flex-1 flex flex-col h-full bg-white ${showChats ? 'flex' : 'hidden'} lg:flex`}>
      {/* Chat Header */}
      <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
        <div className='flex items-center gap-3'>
          <ArrowLeft className='lg:hidden cursor-pointer text-slate-600' onClick={onBack} />
          <div className='w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs'>
            {initials}
          </div>
          <div>
            <h3 className='text-sm font-bold text-slate-900'>{receiver?.uname}</h3>
            <span className='text-[10px] text-green-500 font-medium'>Online</span>
          </div>
        </div>
        <div className='flex items-center gap-4 text-slate-400'>
          
          <MoreVertical className='w-5 h-5 cursor-pointer hover:text-slate-600' />
        </div>
      </div>

      <div className='flex-1 overflow-hidden'>
        <MessagesContainer receiverId={receiverId} />
      </div>

      <MessageIcons receiverId={receiverId} />
    </div>
  )
}

export default Chats