import React, { useState } from 'react'
import { CameraIcon, PlusIcon, Send, SmilePlus } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'

const MessageIcons = () => {
    const [showEmojis, setShowEmojis] = useState(false);

    const toggleEmojis = () => {
    setShowEmojis(prev => !prev);
  };
  return (
          <div className="relative flex items-center justify-end gap-2 mb-5 mx-2">
        <input type="text" className='flex-1 rounded-xl border border-blue-400 px-4 py-2'/>
        <div className='flex items-end gap-2 '>
          <PlusIcon />
          <Send />
          <div className='relative'> 
            <SmilePlus onClick={toggleEmojis} />
            <div className="absolute bottom-full right-0 shadow-lg">
              {showEmojis && <EmojiPicker />}
            </div>
          </div>
        </div>
        
      </div>
  )
}

export default MessageIcons