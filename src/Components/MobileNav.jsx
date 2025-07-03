import { items } from "../Utils/navs"
import { Link } from "react-router";
import { useState, useEffect } from "react";

const MobileNav = ({setShowNav, isOpen}) => {
    const [selectedID, setSelectedID] = useState(() => {
        const saved = sessionStorage.getItem('selectedID')
    
        return saved ? JSON.parse(saved) : 1
      });
    
      useEffect(()=> {
        sessionStorage.setItem('selectedID', selectedID)
      },[selectedID])


  return (
    <div className="bg-white">
        <div
              onClick={() => setShowNav(false)}
              className="fixed inset-0 bg-black/55"
        />
        <div className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out`}
    onClick={()=> setShowNav(false)}>
                  <ul className='flex flex-col gap-16 px-10 py-10 pt-16'>
            {items.map((item) => {
              const isSelected = selectedID === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => {
                    setSelectedID(item.id)
                    setshowNav(false)
                  }}
                  className={`flex items-center gap-3 cursor-pointer transition px-4 py-2 rounded-md 
                    ${isSelected ? `border-l-4 rounded-r-full bg-blue-400 border-l-blue-200 ${selectedID === 6 && 'bg-red-500 border-l-red-800'}` : ''}`}
                >
                  <span className={isSelected ? `text-black ${selectedID === 6 && 'text-white'}` : 'text-[#62618F]'}>
                    {item.icon}
                  </span>
                  <span className={`font-medium ${isSelected ? `text-black ${selectedID === 6 && 'text-white'}` : 'text-[#62618F]'}`}>{item.text}</span>
                </Link>
              );
            })}
          </ul>
    </div>
    </div>
  )
}

export default MobileNav