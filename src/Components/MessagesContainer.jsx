import React, { useRef, useEffect } from 'react'
import { dummyChat } from '../assets/Data/chatMessages'
import Messages from './Messages'
import { useMessageStore } from '../Utils/useMessageStore'

const MessagesContainer = ({ receiverId }) => {
    const bottomRef = useRef(null)
    const { messages } = useMessageStore();

    useEffect(()=> {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth'})
  }, [messages.length])
  return (
        <div className="flex flex-1 flex-col gap-3 px-4 py-2 overflow-y-auto h-full bg-[#fafafa]">
          <Messages receiverId={receiverId} />
          <div ref={bottomRef} ></div>
        </div>
  )
}

export default MessagesContainer