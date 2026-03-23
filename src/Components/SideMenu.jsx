import { MessageCircleQuestion } from 'lucide-react'
import { items } from '../Utils/navs'
import { Link } from 'react-router'

const SideMenu = ({ selectedIndex = 1 }) => {

  // Split items into main nav and preferences (assumes logout/settings are at the end)
  // Adjust these IDs to match your actual navs.js
  const mainItems = items.filter(item => item.id <= 4);
  const prefItems = items.filter(item => item.id >= 5);

  return (
    <div className='hidden lg:flex flex-col w-[240px] h-svh sticky top-0 shrink-0'
      style={{ background: '#0f1624' }}>

      {/* Brand */}
      <div className='px-6 border-b border-white/5'>
        <img src='/TaskMe.png' alt='Logo' className='h-24' />
        
      </div>

      {/* Nav */}
      <div className='flex-1 overflow-y-auto px-3 py-5 flex flex-col gap-6'>

        {/* Main nav */}
        <div>
          <ul className='flex flex-col gap-0.5'>
            {mainItems.map((item) => {
              const isSelected = selectedIndex === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group
                    ${isSelected
                      ? 'bg-white/10 text-white'
                      : 'text-[#6b7a99] hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className={`w-4 h-4 shrink-0 transition-colors
                    ${isSelected ? 'text-white' : 'text-[#6b7a99] group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span className={`text-sm font-medium transition-colors
                    ${isSelected ? 'text-white' : 'text-[#6b7a99] group-hover:text-white'}`}>
                    {item.text}
                  </span>
                </Link>
              );
            })}
          </ul>
        </div>

        {/* Preferences section */}
        <div>
          <p className='text-[10px] font-semibold tracking-[0.15em] uppercase px-3 mb-2'
            style={{ color: '#364156' }}>
            Preferences
          </p>
          <ul className='flex flex-col gap-0.5'>
            {prefItems.map((item) => {
              const isSelected = selectedIndex === item.id;
              const isLogout = item.id === 6; // adjust to your logout id
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group
                    ${isSelected && !isLogout ? 'bg-white/10 text-white' : ''}
                    ${isLogout
                      ? 'text-[#6b7a99] hover:text-red-400 hover:bg-red-500/10'
                      : 'text-[#6b7a99] hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className={`w-4 h-4 shrink-0 transition-colors
                    ${isLogout
                      ? 'group-hover:text-red-400'
                      : isSelected ? 'text-white' : 'text-[#6b7a99] group-hover:text-white'
                    }`}>
                    {item.icon}
                  </span>
                  <span className={`text-sm font-medium transition-colors
                    ${isLogout
                      ? 'group-hover:text-red-400'
                      : isSelected ? 'text-white' : 'text-[#6b7a99] group-hover:text-white'
                    }`}>
                    {item.text}
                  </span>
                </Link>
              );
            })}
          </ul>
        </div>

      </div>

      {/* Help Center card */}
      <div className='mx-3 mb-5 rounded-xl p-4 flex flex-col gap-3'
        style={{ background: '#151f32', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6 rounded-full flex items-center justify-center'
            style={{ background: '#1e3a5f' }}>
            <MessageCircleQuestion className='w-3.5 h-3.5 text-blue-400' />
          </div>
          <span className='text-white text-xs font-semibold'>Help Center</span>
        </div>
        <p className='text-[11px] leading-relaxed' style={{ color: '#4a5a72' }}>
          Access documentation and priority support.
        </p>
        <Link
          to='/helpcenter'
          className='text-center text-xs font-semibold py-2 rounded-lg transition-colors'
          style={{ background: '#1a2d47', color: '#60a5fa' }}
          onMouseEnter={e => e.currentTarget.style.background = '#1e3555'}
          onMouseLeave={e => e.currentTarget.style.background = '#1a2d47'}
        >
          Get Assistance
        </Link>
      </div>

    </div>
  );
};

export default SideMenu;