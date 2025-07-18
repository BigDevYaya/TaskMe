import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import MobileNav from '../Components/MobileNav'
import { collection, onSnapshot } from 'firebase/firestore'
import { useAuthStore } from '../Utils/useAuthStore'
import { db } from '../Utils/firebase'



const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const { user } = useAuthStore();
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, 'users', user.uid, 'notifications'),
      (snapshot) => {
        const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setNotifications(notifications)
      }
    )

    return () => unSub()
  }, [user.uid])
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
          {notifications.length === 0 ? (
            <li className="p-4 bg-gray-100 rounded-lg text-gray-700">
              You have no notifications.
            </li>
          ) : (
            notifications.map(n => (
              <li
                key={n.id}
                className={`p-4 rounded-lg flex justify-between items-center ${n.isRead ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-gray-800 font-semibold'}`}
              >
                <span>{n.message}</span>
                <span className="text-xs">{n.createdAt?.seconds && new Date(n.createdAt.seconds * 1000).toLocaleDateString()}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default Notifications