import React from 'react'
import ChatList from '../Components/ChatList'
import Chats from '../Components/Chats'

const Messages = () => {
  return (
    <div className='flex h-full w-full'>
      <ChatList />
      <Chats />
    </div>
  )
}

export default Messages