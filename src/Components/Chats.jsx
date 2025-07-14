import { ArrowLeft, CameraIcon, Menu, Phone, PlusIcon, Send, SmilePlus, Video } from 'lucide-react'
import { dummyChat } from '../assets/Data/chatMessages'
import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import Messages from './Messages';
import MessagesContainer from './MessagesContainer';
import MessageIcons from './MessageIcons';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../Utils/firebase'

const Chats = ({onBack, receiverId, showChats}) => {
  const [ receiverName, setReceiverName ] = useState('');
  
  const bottomRef = useRef(null);
  useEffect(()=> {
    if(!receiverId) return;
    const fetchReceiverDetails = async () => {
      try {
        const receiver = await getDoc(doc(db, 'users', receiverId));
        if (receiver.exists()) {
          const data = receiver.data();
          console.log(data)
          setReceiverName(data.uname)
        } 
      } catch (error) {
        console.error("Error fetching receiver details:", error);
      }
    }

    fetchReceiverDetails();
  })

  const userFirstName = receiverName.split(' ')[0];
  const userLastName = receiverName.split(' ')[1] || '';
  const userInitials = `${userFirstName.charAt(0).toUpperCase()}${userLastName.charAt(0).toUpperCase()}`;
  

  
  return (
    <div className={`flex-2 ${
      showChats ? 'flex' : 'hidden'
    } flex-col h-full`}>
      <div className='flex items-center gap-4 p-4 border-b border-gray-200 mx-2'>
        <ArrowLeft className='cursor-pointer lg:hidden' onClick={onBack} />
        <div className='flex-1 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
    {/* Avatar */}
    <div className='w-14 h-14 bg-amber-300 rounded-full flex items-center justify-center text-white font-bold text-lg'>
      {
        userInitials
      }
    </div>

    {/* Name and Message */}
    <div className='flex flex-col'>
      <p className='text-sm font-semibold text-gray-800'>{receiverName}</p>
    </div>
        </div>
        
        </div>
      </div>

      <div className='flex-1 min-h-0'>
        <MessagesContainer receiverId={receiverId} />   
      </div>   


      <MessageIcons receiverId={receiverId} />
    </div>
  )
}

export default Chats