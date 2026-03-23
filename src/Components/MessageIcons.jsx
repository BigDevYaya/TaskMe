import React, { useState } from 'react'
import { Send, Smile, Paperclip } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { useMessageStore } from '../Utils/useMessageStore'
import { useAuthStore } from '../Utils/useAuthStore'

const MessageIcons = ({ receiverId }) => {
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const { sendMessage } = useMessageStore()
  const { user } = useAuthStore()

  const handleSend = async () => {
    if (!text.trim()) return
    await sendMessage({ senderId: user.uid, receiverId, text, type: 'text' })
    setText('')
    setShowEmoji(false)
  }

  return (
    <div className='p-4 bg-white border-t border-slate-100 relative'>
      {showEmoji && (
        <div className='absolute bottom-20 right-4 shadow-2xl border border-slate-100 rounded-2xl overflow-hidden'>
          <EmojiPicker onEmojiClick={(e) => setText(prev => prev + e.emoji)} />
        </div>
      )}
      <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-400 transition-all'>
        <Paperclip className='w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600' />
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className='flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-700'
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Smile 
          className={`w-5 h-5 cursor-pointer transition-colors ${showEmoji ? 'text-blue-500' : 'text-slate-400 hover:text-slate-600'}`}
          onClick={() => setShowEmoji(!showEmoji)} 
        />
        <button 
          onClick={handleSend}
          disabled={!text.trim()}
          className='p-1.5 bg-blue-600 rounded-lg text-white disabled:opacity-50 disabled:bg-slate-300 transition-all'
        >
          <Send className='w-4 h-4' />
        </button>
      </div>
    </div>
  )
}

export default MessageIcons