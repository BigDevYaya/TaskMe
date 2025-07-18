import React, { useEffect, useState } from 'react'
import { Bell, CheckCircle2, UploadCloud } from 'lucide-react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../Utils/firebase'
import { useAuthStore } from '../Utils/useAuthStore'
import { Link } from 'react-router'



const Notification = ({setShowNotif}) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, 'users', user.uid, 'notifications'),
      (snapshot) => {
        const notifications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setNotifications(notifications.slice(0, 3))
      }
    )

    return () => unSub()
  }, user.uid)


  useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      setShowNotif(false);
    }
  };
  document.addEventListener('keydown', handleEsc);

  return () => {
    document.removeEventListener('keydown', handleEsc);
  };
}, []);

  return (
    <div className="absolute top-16 right-4 w-80 bg-white shadow-xl rounded-xl border border-blue-800 z-50 overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-b-blue-800">
        <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
          <Bell size={18} /> Notifications
        </h3>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition"
          >
            {/* <div>{note.icon}</div> */}
            <div className="flex-1">
              <p className="text-sm text-gray-700">{note.message}</p>
              <span className="text-xs text-gray-400">{note.createdAt?.seconds && new Date(note.createdAt?.seconds * 1000).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      <Link 
      className="px-4 py-2 text-center text-sm text-indigo-600 hover:underline cursor-pointer"
      to={'/notifications'}>
        View all
      </Link>
    </div>
  )
}

export default Notification
