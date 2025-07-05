import { items } from "../Utils/navs"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const MobileNav = ({setShowNav, isOpen, selectedIndex}) => {
    

  return (
    <div className="bg-white">
        <div
              onClick={() => setShowNav(false)}
              className="fixed inset-0 bg-black/55"
        />
        <div className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out animate-slideIn`}
    onClick={()=> setShowNav(false)}>
                  <ul className='flex flex-col gap-16 px-10 py-10 pt-16'>
            {items.map((item) => {
              const isSelected = selectedIndex === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => {
                    setShowNav(false)
                  }}
                  className={`flex items-center gap-3 cursor-pointer transition px-4 py-2 rounded-md 
                    ${isSelected ? `border-l-4 rounded-r-full bg-blue-400 border-l-blue-200 ${selectedIndex === 6 && 'bg-red-500 border-l-red-800'}` : ''}`}
                >
                  <span className={isSelected ? `text-black ${selectedIndex === 6 && 'text-white'}` : 'text-[#62618F]'}>
                    {item.icon}
                  </span>
                  <span className={`font-medium ${isSelected ? `text-black ${selectedIndex === 6 && 'text-white'}` : 'text-[#62618F]'}`}>{item.text}</span>
                </Link>
              );
            })}
          </ul>
    </div>
    </div>
  )
}

export default MobileNav