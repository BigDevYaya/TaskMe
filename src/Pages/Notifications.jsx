import { Menu } from 'lucide-react'
import { useState } from 'react'
import MobileNav from '../Components/MobileNav'

const mockNotifications = [
  {
    id: 1,
    message: 'Your task "Write a product review" was approved!',
    date: '2025-07-05',
    read: false,
  },
  {
    id: 2,
    message: 'You earned ₦100 for completing "Instagram Follow".',
    date: '2025-07-04',
    read: true,
  },
  {
    id: 3,
    message: 'New task available: "Answer a 5-minute survey".',
    date: '2025-07-03',
    read: false,
  },
]

const Notifications = () => {
  const [showNav, setShowNav] = useState(false)
  return (
    <div className="min-h-scree">
      <div className='flex items-center gap-2 bg-white py-5 px-3 justify-start shadow-sm'>
        <Menu className='lg:hidden cursor-pointer' onClick={() => setShowNav(prev => !prev)}/>
        <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
      </div>

      {showNav && <MobileNav setShowNav={setShowNav} isOpen={showNav} selectedIndex={5} />}

      <div className="max-w-2xl mx-auto mt-8 p-4 ">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Notifications</h2>
        <ul className="space-y-4">
          {mockNotifications.length === 0 ? (
            <li className="p-4 bg-gray-100 rounded-lg text-gray-700">
              You have no notifications.
            </li>
          ) : (
            mockNotifications.map(n => (
              <li
                key={n.id}
                className={`p-4 rounded-lg flex justify-between items-center ${n.read ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-gray-800 font-semibold'}`}
              >
                <span>{n.message}</span>
                <span className="text-xs">{n.date}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default Notifications