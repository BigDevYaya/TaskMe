import React, { useRef, useEffect } from 'react'
import { dummyChat } from '../assets/Data/chatMessages'
import Messages from './Messages'

const MessagesContainer = () => {
    const bottomRef = useRef(null)

    useEffect(()=> {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth'})
  }, [dummyChat.length])
  return (
        <div className="flex flex-col gap-3 p-4 overflow-y-auto max-h-[calc(100vh-200px)] bg-[#fafafa] ">
          <Messages />
          <div ref={bottomRef} ></div>
        </div>
  )
}

export default MessagesContainer