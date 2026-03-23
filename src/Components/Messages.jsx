import { useState, useEffect } from 'react'
import { useAuthStore } from '../Utils/useAuthStore'
import { useMessageStore } from '../Utils/useMessageStore'
import { dummyChat } from '../assets/Data/chatMessages'

const Messages = ({ receiverId }) => {
  const { user } = useAuthStore()
  const { messages, fetchMessages } = useMessageStore()

  useEffect(() => {
    fetchMessages(receiverId)
  }, [receiverId, fetchMessages])

  return (
    <div className="flex flex-col gap-4 p-6">
      {messages.map((msg) => {
        const isMe = msg.senderId === user.uid
        return (
          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] group`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                isMe 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                <p className='leading-relaxed'>{msg.text}</p>
              </div>
              <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                <span className='text-[10px] text-slate-400 font-medium'>
                  {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {isMe && <div className="text-blue-500 text-[10px] font-bold">✓✓</div>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Messages