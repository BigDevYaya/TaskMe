import { Menu, Bell, CheckCheck, BellOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import MobileNav from '../Components/MobileNav'
import { collection, onSnapshot, query, orderBy, doc, updateDoc, writeBatch } from 'firebase/firestore'
import { useAuthStore } from '../Utils/useAuthStore'
import { db } from '../Utils/firebase'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const { user } = useAuthStore()
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    if (!user?.uid) return
    const q = query(
      collection(db, 'users', user.uid, 'notifications'),
      orderBy('createdAt', 'desc')
    )

    const unSub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setNotifications(data)
    })
    return () => unSub()
  }, [user?.uid])

  const markAllRead = async () => {
    const batch = writeBatch(db)
    notifications.forEach((n) => {
      if (!n.isRead) {
        const ref = doc(db, 'users', user.uid, 'notifications', n.id)
        batch.update(ref, { isRead: true })
      }
    })
    await batch.commit()
  }

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      {/* Top Header */}
      <div className='flex items-center justify-between bg-white border-b border-slate-200 px-6 py-4'>
        <div className='flex items-center gap-4'>
          <Menu className='lg:hidden cursor-pointer text-slate-600' onClick={() => setShowNav(true)} />
          <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
        </div>
        {notifications.some(n => !n.isRead) && (
          <button 
            onClick={markAllRead}
            className='flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors'
          >
            <CheckCheck size={18} />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {showNav && <MobileNav setShowNav={setShowNav} isOpen={showNav} selectedIndex={5} />}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto py-8 px-4">
          {notifications.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-20 text-slate-400'>
              <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4'>
                <BellOff size={32} className='text-slate-300' />
              </div>
              <p className='font-medium'>All caught up!</p>
              <p className='text-sm'>No new notifications at the moment.</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {notifications.map(n => (
                <div
                  key={n.id}
                  className={`group relative p-4 rounded-2xl border transition-all duration-200 ${
                    n.isRead 
                      ? 'bg-transparent border-transparent opacity-75' 
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className='flex items-start gap-4'>
                    {/* Status Indicator */}
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.isRead ? 'bg-slate-300' : 'bg-blue-600 animate-pulse'}`} />
                    
                    <div className='flex-1'>
                      <p className={`text-sm leading-relaxed ${n.isRead ? 'text-slate-500' : 'text-slate-900 font-medium'}`}>
                        {n.message}
                      </p>
                      <span className="text-[11px] text-slate-400 mt-2 block font-medium uppercase tracking-wider">
                        {n.createdAt?.seconds ? new Date(n.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Just now'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications