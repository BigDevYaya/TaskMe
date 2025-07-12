import React, { useRef, useEffect } from 'react'
import { dummyChat } from '../assets/Data/chatMessages'
import Messages from './Messages'

const MessagesContainer = ({ receiverId }) => {
    const bottomRef = useRef(null)

    useEffect(()=> {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth'})
  }, [dummyChat.length])
  return (
        <div className="flex flex-1 flex-col gap-3 px-4 py-2 overflow-y-auto h-full bg-[#fafafa] ">
          <Messages receiverId={receiverId} />
          <div ref={bottomRef} ></div>
        </div>
  )
}

export default MessagesContainer