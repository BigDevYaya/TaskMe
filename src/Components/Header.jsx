import React, { useEffect, useState } from 'react'
import { Bell, Menu, Search } from 'lucide-react'
import Notification from '../Components/Notification'
import ProfileDropDown from './ProfileDropDown'
import MobileNav from './MobileNav'
import { useAuthStore } from '../Utils/useAuthStore'

const Header = ({title, explore, className, setShowNav}) => {

  const [showNotif, setShowNotif] = useState(false) 
  const [showLogout, setShowLogout] = useState(false)

  
  const [color, setColor] = useState('')
  const { user } = useAuthStore();

  const formattedName = user.displayName.split(' ')
  const [fname, lname] = formattedName
  const format = fname[0].toUpperCase()+lname[0].toUpperCase()

  const generateColor = () => {
    const red = Math.floor((Math.random() * 100) + 1)
    const green = Math.floor((Math.random() * 100) + 1)
    const blue = Math.floor((Math.random() * 100) + 1)

    setColor(`rgb(${red}, ${green}, ${blue})`)
  }


  useEffect(() => generateColor(), [])


  return (
        <div className='flex flex-col items-start justify-between h-fit z-50 p-4 bg-white transition-all duration-500 w-svh'>
            <div className='flex justify-between w-full items-center'>
              <div className='flex items-center gap-4'>
                <Menu className='lg:hidden' onClick={() => setShowNav(prev => !prev)}/>
                <div className='flex gap-4 lg:flex-row flex-1 w-full flex-col justify-start'>
                  <p className='text-black font-bold space-x-1 text-2xl'>{title}</p> 
                  <div className={`${className ? className : 'hidden'}  items-center border border-blue-100 px-4 py-2 rounded-2xl md:w-[500px]`}>
                    <input
                      type="text"
                      className="focus:outline-none flex-1 text-sm md:text-base "
                      placeholder="Search tasks..."
                    />
                    <Search className="text-blue-400" />
                  </div>
                </div >
              </div>
              
            <div className='flex items-center p-3'>
                <div className='flex p-4 w-fit relative'>
                <button onClick={() => setShowNotif(prev => !prev)} className='focus:outline-none'>
                  <Bell />
                </button>
                <span className='bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 absolute top-0'>3</span>
                </div>
                
                <div className={`w-14 h-14 bg-[rgb(100, 100, 100)] rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer`}
                style={{backgroundColor: color}}
                 onClick={() => setShowLogout(!showLogout)}>
                  { format }
                </div>
            </div>
            </div>
            <div className={`w-full transition-all duration-1000 ease-linear ${explore ? 'max-h-[500px]' : 'max-h-0'}`}>
              {
                explore
              }

          </div>
          
          
          { showNotif && <Notification setShowNotif={setShowNotif} />}
          { showLogout && <ProfileDropDown setShowLogout={setShowLogout} /> }
        </div>
  )
}

export default Header