import React, { useState } from 'react'
import { CameraIcon, PlusIcon, Send, SmilePlus } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { useMessageStore } from '../Utils/useMessageStore';
import { useAuthStore } from '../Utils/useAuthStore';
import toast from 'react-hot-toast';

const MessageIcons = ({ receiverId }) => {
    const [showEmojis, setShowEmojis] = useState(false);

    const { sendMessage } = useMessageStore()
    const { user } = useAuthStore()
    const [messageText, setMessageText] = useState('');

    const toggleEmojis = () => {
      setShowEmojis(prev => !prev);
    };

    const handleTextChange = (e) => {
      setMessageText(e.target.value)
    }
    const handleEmojiClick = (e) => {
      setMessageText(prev => prev+e.emoji)
    }

    const handleMessageSend = async (text) => {
      if(!text || !receiverId || text.trim() === '') return;
      try {
        await sendMessage({
        senderId: user.uid,
        receiverId,
        text,
        type: 'text'
      })

      setMessageText('');
      setShowEmojis(false);
      } catch(err) {
        toast.error('An error occurred while sending the message.')
      }
    }
  
  return (
          <div className="relative flex items-center justify-end gap-2 mx-2">
        <input 
        type="text" 
        value={messageText}
        onChange={handleTextChange}
        className='flex-1 rounded-xl border border-blue-400 px-4 py-2'/>
        <div className='flex items-end gap-2 '>
          <Send onClick={()=> handleMessageSend(messageText)} />
          <div className='relative'> 
            <SmilePlus onClick={()=>toggleEmojis()} />
            <div className="absolute bottom-full right-0 shadow-lg">
              {showEmojis && <EmojiPicker onEmojiClick={handleEmojiClick} />}
            </div>
          </div>
        </div>
        
      </div>
  )
}

export default MessageIcons