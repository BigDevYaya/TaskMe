import React from 'react'
import { useAuthStore } from '../Utils/useAuthStore'

const ProfileDropDown = ({setShowLogout}) => {
    document.addEventListener('keydown', e => {
        if(e.key === 'Escape'){
            setShowLogout(false)
        } else {
            return
        }
    })
    const { logout } = useAuthStore()
  return (
    <div className="absolute top-18 right-8  shadow-xl rounded-xl flex items-center z-50 overflow-hidden animate-fade-in">
        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
        onClick={async () => {
            await logout()
            setShowLogout(false)}}>Log out</button>
    </div>
  )
}

export default ProfileDropDown