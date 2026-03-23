import React, { useEffect, useState } from 'react'
import { Bell, Search, Menu, SlidersHorizontal } from 'lucide-react'
import Notification from '../Components/Notification'
import ProfileDropDown from './ProfileDropDown'
import { useAuthStore } from '../Utils/useAuthStore'
import { useLocation } from 'react-router'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Utils/firebase'

const Header = ({ title, explore, className, setShowNav }) => {
  const [showNotif, setShowNotif] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [showLogout, setShowLogout] = useState(false)
  const [color, setColor] = useState('')

  const location = useLocation()
  const { user } = useAuthStore()
  
  // 1. Fallback to 'User' if displayName is null/undefined
  const displayName = user?.displayName || 'User'
  
  // 2. Split the name
  const [fname, lname] = displayName.trim().split(' ')
  
  // 3. Safely grab the first letter of each, or nothing if lname is missing
  const format = `${fname?.[0] || ''}${lname?.[0] || ''}`.toUpperCase() || 'U'

  const generateColor = () => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#3b82f6']
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, 'users', user.uid, 'notifications'),
      (snapshot) => {
        const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setNotifications(notifications)
      }
    )
    return () => unSub()
  }, [user.uid])

  useEffect(() => generateColor(), [])

  const unreadCount = notifications.filter(n => n.isRead === 'false').length

  return (
    <div className="w-full bg-white px-6 pt-6 pb-4">

      {/* Top row */}
      <div className="flex items-center justify-between gap-4">

        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setShowNav(prev => !prev)}
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>

          <div className="min-w-0">
            <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-none truncate">
              {title}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Right: search + actions */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Search pill — desktop */}
          <div className={`${className ? 'flex' : 'hidden md:flex'} items-center gap-2.5 bg-gray-50 border border-gray-100 hover:border-gray-200 px-3.5 py-2 rounded-xl w-[220px] transition-colors`}>
            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <input
              type="text"
              className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
              placeholder="Search tasks..."
            />
          </div>

          {/* Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(prev => !prev)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-4 h-4 text-gray-600" />
            </button>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </div>

          {/* Avatar */}
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 transition-transform hover:scale-105"
            style={{ backgroundColor: color }}
            onClick={() => setShowLogout(prev => !prev)}
          >
            {format}
          </button>

        </div>
      </div>

     

      {/* Popovers */}
      {showNotif && <Notification setShowNotif={setShowNotif} />}
      {showLogout && <ProfileDropDown setShowLogout={setShowLogout} />}
    </div>
  )
}

export default Header