import { useState, useEffect } from 'react'
import { useAuthStore } from '../Utils/useAuthStore'
import { useMessageStore } from '../Utils/useMessageStore'
import { dummyChat } from '../assets/Data/chatMessages'

const Messages = () => {
  return (
    <>
    {dummyChat.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'me' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  msg.sender === 'me'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                <p>{msg.message}</p>
                <span className="block text-[10px] text-gray-300 mt-1 text-right">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
    </>
  )
}

export default Messages