import React, { useState } from 'react';
import { Menu, User, Shield, Palette, Bell, Globe, Trash2, ChevronRight } from 'lucide-react';
import MobileNav from '../Components/MobileNav';
import ProAcc from "../Components/settings/ProAcc"
import Theme from "../Components/settings/Theme"
import Privacy from "../Components/settings/Privacy"


const Settings = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'theme', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProAcc />;
      case 'theme': return <Theme />;
      case 'privacy': return <Privacy />;
      default: return <ProAcc />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      {/* Header - Flat, no shadow */}
      <div className='flex items-center gap-4 bg-white border-b border-slate-200 px-8 py-5 shrink-0'>
        <Menu className='lg:hidden cursor-pointer text-slate-600' onClick={() => setShowNav(true)} />
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Settings</h1>
      </div>

      {showNav && <MobileNav setShowNav={setShowNav} isOpen={showNav} selectedIndex={6} />}

      <div className="flex flex-1 overflow-hidden p-4 lg:p-8 gap-8">
        
        {/* Left Sidebar - Floating Tabs */}
        <div className="hidden lg:flex flex-col w-72 gap-2">
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Settings</p>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-semibold  ${
                  isActive 
                  ? 'bg-white border border-slate-200 text-blue-600' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tab.icon}
                  {tab.label}
                </div>
                {isActive && <ChevronRight size={14} />}
              </button>
            )
          })}
        </div>

        {/* Right Content Area - Flat Card */}
        <div className="flex-1 overflow-y-auto   p-8 lg:p-12">
          <div className="max-w-2xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;