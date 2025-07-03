import { Menu } from 'lucide-react'
import { useState } from 'react'
import MobileNav from '../Components/MobileNav'

const Notifications = () => {
  const [showNav, setShowNav] = useState(false)
  return (
    <div>
      <div className='flex items-center gap-2 bg-white  py-5 px-3 justify-start'>
        <Menu className='lg:hidden' onClick={() => setShowNav(prev => !prev)}/>
        <h1>Notifications</h1>
      </div>

      {
        showNav && <MobileNav setshowNav={setShowNav} isOpen={showNav}/>
      }
    </div>
  )
}

export default Notifications