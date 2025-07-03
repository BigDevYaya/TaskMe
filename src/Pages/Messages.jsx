import React from 'react'
import ChatList from '../Components/ChatList'
import Chats from '../Components/Chats'

const Messages = () => {
  return (
    <div className='lg:flex h-full lg:w-full overflow-hidden relative'>
      <ChatList />
      <Chats />
    </div>
  )
}

export default Messages