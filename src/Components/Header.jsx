import React, { useState } from 'react'
import { Bell, Menu } from 'lucide-react'
import Notification from '../Components/Notification'
import ProfileDropDown from './ProfileDropDown'

const Header = ({title, explore}) => {

  const [showNotif, setShowNotif] = useState(false) 
  const [showLogout, setShowLogout] = useState(false)
  // const generateColor = () => {
  //   const red 
  // }

  return (
        <div className='flex flex-col items-start justify-between h-fit z-50 p-4 bg-white transition-all duration-500 overflow-hidden w-full'>
            <div className='flex justify-between w-full items-center'>
              <p className='text-black font-bold space-x-1 text-2xl'>{title}</p>
            <div className='flex items-center p-3'>
                <div className='flex p-4 w-fit relative'>
                <button onClick={() => setShowNotif(prev => !prev)} className='focus:outline-none'>
                  <Bell />
                </button>
                <span className='bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 absolute top-0'>3</span>
                </div>
                <div className='w-14 h-14 bg-amber-300 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer' onClick={() => setShowLogout(!showLogout)}>
                  IY
                </div>
                <Menu className='bg-blue-400 p-2 rounded-full lg: hidden w-10 h-10' />
            </div>
            </div>
            <div className={`w-full overflow-hidden transition-all duration-1000 ease-linear ${explore ? 'max-h-[500px]' : 'max-h-0'}`}>
              {
                explore
              }

          { showNotif && <Notification setShowNotif={setShowNotif} />}
          { showLogout && <ProfileDropDown setShowLogout={setShowLogout} /> }
      </div>
        </div>
  )
}

export default Header