import React, { useState } from 'react';
import { Menu } from 'lucide-react'
import ProAcc from '../Components/settings/ProAcc';
import Theme from '../Components/settings/Theme';
import Privacy from '../Components/settings/Privacy';
import MobileNav from '../Components/MobileNav';
import ChangePasswordModal from '../Components/settings/modals/ChangePasswordModal';
import ChangeEmailModal from '../Components/settings/modals/ChangeEmailModal';
import LoginActivityModal from '../Components/settings/modals/LoginActivityModal';
import DeleteAccountModal from '../Components/settings/modals/DeleteAccountModal';

const Settings = () => {
  const [showNav, setShowNav] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showLoginActivity, setShowLoginActivity] = useState(false)
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)
  return (
    <>
    {/* <ChangePasswordModal /> */}
  <div className="mx-4 my-8 max-w-3xl">
    <div className='flex items-center justify-start gap-2 sticky top-0 bg-white px-3 py-5'>
      <Menu className='lg:hidden' onClick={() => setShowNav(prev => !prev)} />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Settings</h1>
    </div>

    <ProAcc 
    setShowPasswordModal={setShowPasswordModal}
    setShowEmailModal={setShowEmailModal} />

    <Theme />

    <Privacy 
    setShowLoginActivity={setShowLoginActivity}
    setShowDeleteAccountModal={setShowDeleteAccountModal}
    />
    {
      showNav && <MobileNav setshowNav={setShowNav} isOpen={showNav} />
    }
    {
      showPasswordModal && <ChangePasswordModal setShowPasswordModal={setShowPasswordModal} />
    }
    {
      showEmailModal && <ChangeEmailModal setShowEmailModal={setShowEmailModal} />
    }
    {
      showLoginActivity && <LoginActivityModal setShowLoginActivity={setShowLoginActivity} />
    }
    {
      showDeleteAccountModal && <DeleteAccountModal setShowDeleteAccountModal={setShowDeleteAccountModal} />
    }
  </div>
    </>
);
}

export default Settings;