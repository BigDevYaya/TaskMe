import React, { useState } from 'react';
import { Menu } from 'lucide-react'
import ProAcc from '../Components/settings/ProAcc';
import Theme from '../Components/settings/Theme';
import Privacy from '../Components/settings/Privacy';
import MobileNav from '../Components/MobileNav';

const Settings = () => {
  const [showNav, setShowNav] = useState(false)
  return (
  <div className="mx-4 my-8 max-w-3xl">
    <div className='flex items-center justify-start gap-2 sticky top-0 bg-white px-3 py-5'>
      <Menu className='lg:hidden' onClick={() => setShowNav(prev => !prev)} />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Settings</h1>
    </div>

    <ProAcc />

    <Theme />

    <Privacy />
    {
      showNav && <MobileNav setshowNav={setShowNav} isOpen={showNav} />
    }
  </div>
);
}

export default Settings;