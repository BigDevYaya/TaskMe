import { useState, useEffect } from 'react'
import { useAuthStore } from '../Utils/useAuthStore'
import { useMessageStore } from '../Utils/useMessageStore'
import { dummyChat } from '../assets/Data/chatMessages'

const Messages = ({ receiverId }) => {
  const { user } = useAuthStore()
  const { messages, fetchMessages, clearMessages } = useMessageStore()

  useEffect(() => {
    if(user.uid && receiverId) {
      fetchMessages(user.uid, receiverId)
      return () => clearMessages()
    }
  }, [user?.uid, receiverId])
  return (
    <>
    {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === user.uid ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs  text-sm `}
              >
                <p className={`break-words px-4 py-2 rounded-lg ${
                  msg.senderId === user.uid
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                } `}>{msg.text}</p>
                <span className="block text-[10px] text-gray-800 mt-1 text-right">
                  {msg.createdAt?.toDate().toLocaleTimeString() ?? 'Just now'}
                </span>
              </div>
            </div>
          ))}
    </>
  )
}

export default Messages