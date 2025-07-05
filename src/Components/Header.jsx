import React, { useEffect, useState } from 'react'
import { Bell, Menu, Search } from 'lucide-react'
import Notification from '../Components/Notification'
import ProfileDropDown from './ProfileDropDown'
import { useAuthStore } from '../Utils/useAuthStore'
import { useLocation } from 'react-router'

const Header = ({ title, explore, className, setShowNav }) => {
  const [showNotif, setShowNotif] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [color, setColor] = useState('')

  const location = useLocation()
  const isDashboardPage = location.pathname === '/'
  console.log(isDashboardPage)
  const { user } = useAuthStore()
  const formattedName = user.displayName.split(' ')
  const [fname, lname] = formattedName
  const format = fname[0].toUpperCase() + lname[0].toUpperCase()

  const generateColor = () => {
    const red = Math.floor(Math.random() * 100 + 1)
    const green = Math.floor(Math.random() * 100 + 1)
    const blue = Math.floor(Math.random() * 100 + 1)
    setColor(`rgb(${red}, ${green}, ${blue})`)
  }

  useEffect(() => generateColor(), [])

  return (
    <div className="flex flex-col items-start justify-between h-fit z-50 p-4 bg-white transition-all duration-500 w-full">
      {/* Top section */}
      <div className="flex justify-between mx-1.5 w-full items-center flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Menu className="lg:hidden cursor-pointer" onClick={() => setShowNav((prev) => !prev)} />
          <p className="text-black font-bold text-xl md:text-2xl truncate">{title}</p>
        <div
          className={`${
             'hidden md:flex'
          } flex items-center border border-blue-100 px-4 py-2 rounded-2xl w-full md:w-[400px] max-w-full`}
        >
          <input
            type="text"
            className="focus:outline-none flex-1 text-sm md:text-base w-full"
            placeholder="Search tasks..."
          />
          <Search className="text-blue-400" />
        </div>
        </div>

        {/* Search bar - hidden on small screens by default */}

        {/* Right section: Notification + Profile */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="relative">
            <button onClick={() => setShowNotif((prev) => !prev)} className="focus:outline-none">
              <Bell />
            </button>
            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 absolute -top-1 -right-2">
              3
            </span>
          </div>

          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => setShowLogout(!showLogout)}
          >
            {format}
          </div>
        </div>
      </div>

      {/* Explore section (optional) */}
      <div
          className={`${
            isDashboardPage ? 'hidden' : 'md:hidden flex'
          } flex items-center border border-blue-100 px-4 py-2 rounded-2xl w-full md:w-[400px] max-w-full mt-1.5`}
        >
          <input
            type="text"
            className="focus:outline-none flex-1 text-sm md:text-base w-full"
            placeholder="Search tasks..."
          />
          <Search className="text-blue-400" />
        </div>
      <div
        className={`w-full transition-all duration-700 ease-linear overflow-hidden ${
          explore ? 'max-h-[500px] mt-4' : 'max-h-0'
        }`}
      >
        {explore}
      </div>

      {/* Conditional Popovers */}
      {showNotif && <Notification setShowNotif={setShowNotif} />}
      {showLogout && <ProfileDropDown setShowLogout={setShowLogout} />}
    </div>
  )
}

export default Header
