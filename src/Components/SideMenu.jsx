import { MessageCircleQuestion } from 'lucide-react'
import { items } from '../Utils/navs'
import { Link } from 'react-router'
import React, {useEffect, useState} from 'react'

const SideMenu = () => {
  const [selectedID, setSelectedID] = useState(() => {
    const saved = sessionStorage.getItem('selectedID')

    return saved ? JSON.parse(saved) : null
  });

  useEffect(()=> {
    sessionStorage.setItem('selectedID', selectedID)
  },[selectedID])
  return (
    <div className='lg:flex flex-col px-6 py-8 gap-6 w-[300px] sticky top-0 bg-white h-svh hidden'>
      
      {/* Title */}
      <img src="./TaskMe.png" className='rounded-lg w-32 h-fit self-center'  alt="Logo" />

      <div className='flex-1 overflow-y-auto pr-1'>
        <nav>
          <ul className='flex flex-col gap-5'>
            {items.map((item) => {
              const isSelected = selectedID === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => setSelectedID(item.id)}
                  className={`flex items-center gap-3 cursor-pointer transition px-4 py-2 rounded-md 
                    ${isSelected ? `border-l-4 rounded-r-full bg-blue-400 border-l-blue-200 ${selectedID === 5 && 'bg-red-500 border-l-red-800'}` : ''}`}
                >
                  <span className={isSelected ? `text-black ${selectedID === 5 && 'text-white'}` : 'text-[#62618F]'}>
                    {item.icon}
                  </span>
                  <span className={`font-medium ${isSelected ? `text-black ${selectedID === 5 && 'text-white'}` : 'text-[#62618F]'}`}>{item.text}</span>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Fixed Help Center */}
      <div className='bg-blue-500 px-4 py-6 flex flex-col items-center gap-5 text-white rounded-xl'>
        <MessageCircleQuestion className='-mt-10 shadow-xl bg-blue-600 border-4 border-white rounded-full w-10 h-10' />
        <div className='flex flex-col items-center gap-3'>
          <h4 className='text-sm font-semibold'>Help Center</h4>
          <p className='text-xs text-center leading-snug max-w-[180px]'>
            Having trouble? Visit our help center for assistance with your account, tasks, and more.
          </p>
          <Link to={'/helpcenter'} className='bg-white text-blue-500 text-sm px-4 py-2 rounded-md'>
            Go to Help center
          </Link>
        </div>
      </div>
    </div>
  );
};


export default SideMenu
