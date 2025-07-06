import { SearchIcon } from 'lucide-react'
import messages from '../assets/Data/messages.json'
import React from 'react'

const ChatList = ({onChatSelect}) => {
  let [fname, lname] = ['John', 'Doe']
  return (
    <div className='flex-1 mb-2 bg-[#fafafa] rounded-lg overflow-y-auto h-full'>
      <div className='flex items-center gap-2 border border-blue-400 rounded-2xl bg-white py-4 px-7 m-4'>
        <SearchIcon className='text-blue-400' />
        <input type="text" className='flex-1 w-full focus:outline-none'/>
      </div>
      <div className='flex flex-col h-[calc(100vh-100px)] overflow-y-auto'>
        {
          messages.map((message, i) => {

          const nameArr = message.username.split(' ');
          const firstName = nameArr[0];
          const lastName = nameArr.length > 1 ? nameArr[1] : '';
          const initials = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;

            return (
            <div className='flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg cursor-pointer transition-all border-b border-gray-200'onClick={onChatSelect} key={i}>
  {/* Left: Avatar + Message Info */}
  <div className='flex items-center gap-4'>
    {/* Avatar */}
    <div className='w-14 h-14 bg-amber-300 rounded-full flex items-center justify-center text-white font-bold text-lg'>
      {initials}
    </div>

    {/* Name and Message */}
    <div className='flex flex-col'>
      <p className='text-sm font-semibold text-gray-800'>{message.username}</p>
      <span className='text-xs text-gray-500 truncate max-w-[200px]'>{message.message}</span>
    </div>
  </div>

  {/* Right: Unread Count + Time */}
  <div className='flex flex-col items-end gap-1'>
    {
      message.unreadCount > 0 && (
        <span className='text-xs bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-medium'>{message.unreadCount}</span>
      )
    }
    <span className='text-[11px] text-gray-400'>{message.date}</span>
  </div>
</div>
          )
          } )
        }

      </div>
    </div>
  )
}

export default ChatList