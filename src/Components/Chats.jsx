import { CameraIcon, Phone, PlusIcon, Send, SmilePlus, Video } from 'lucide-react'
import { dummyChat } from '../assets/Data/chatMessages'
import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import Messages from './Messages';
import MessagesContainer from './MessagesContainer';
import MessageIcons from './MessageIcons';

const Chats = () => {
  
  const bottomRef = useRef(null);

  

  
  return (
    <div className='flex-2 flex flex-col justify-between h-full '>
      <div className='flex items-center justify-between p-4 border-b border-gray-200 mx-2'>
        <div className='flex items-center gap-4'>
    {/* Avatar */}
    <div className='w-14 h-14 bg-amber-300 rounded-full flex items-center justify-center text-white font-bold text-lg'>
      IY
    </div>

    {/* Name and Message */}
    <div className='flex flex-col'>
      <p className='text-sm font-semibold text-gray-800'>Israel Yaya</p>
    </div>
        </div>
        <div className='flex items-end gap-4 bg-blue-400 px-4 py-2 rounded-3xl'>
          <Phone className='cursor-pointer' />
          <div className='w-0.5 h-7 bg-black'></div>
          <Video className='cursor-pointer' />
        </div>
      </div>

      <MessagesContainer />      


      <MessageIcons />
    </div>
  )
}

export default Chats