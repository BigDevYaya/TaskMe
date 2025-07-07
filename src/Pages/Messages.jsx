import React, { useState } from 'react'
import ChatList from '../Components/ChatList'
import MobileNav from '../Components/MobileNav'
import Chats from '../Components/Chats'

const Messages = () => {
  const [showChats, setShowChats] = useState(false)
  const [showNav, setShowNav] = useState(false)
  return (
    <div className='flex h-full w-full overflow-hidden relative'>
      {
        showNav && <MobileNav setShowNav={setShowNav} isOpen={showNav} selectedIndex={4} />
      }
      {/* ChatList: show on large screens or when not viewing chats on mobile */}
      <div className={`w-full lg:w-1/3 h-full ${showChats ? 'hidden' : 'block'} lg:block`}>
        <ChatList onChatSelect={() => setShowChats(true)} setShowNav={setShowNav} />
      </div>
      {/* Chats: show on large screens or when viewing chats on mobile */}
      <div className={`w-full lg:w-2/3 h-full ${showChats ? 'block' : 'hidden'} lg:block`}>
        <Chats onBack={() => setShowChats(false)} />
      </div>
    </div>
  )
}

export default Messages