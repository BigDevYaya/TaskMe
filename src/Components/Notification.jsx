import React from 'react'
import { Bell, CheckCircle2, UploadCloud } from 'lucide-react'

const mockNotifications = [
  {
    id: 1,
    message: 'Your task "Follow IG account" was completed.',
    icon: <CheckCircle2 size={20} className="text-green-500" />,
    time: '2h ago',
  },
  {
    id: 2,
    message: 'You uploaded a new task: "Survey Feedback"',
    icon: <UploadCloud size={20} className="text-blue-500" />,
    time: '6h ago',
  },
  {
    id: 3,
    message: 'Task "App Review" has been accepted.',
    icon: <CheckCircle2 size={20} className="text-purple-500" />,
    time: '1d ago',
  },
]

const Notification = ({setShowNotif}) => {

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      setShowNotif(false)
    } else {
      return
    }
  })
  return (
    <div className="absolute top-16 right-4 w-80 bg-white shadow-xl rounded-xl border border-blue-800 z-50 overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-b-blue-800">
        <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
          <Bell size={18} /> Notifications
        </h3>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {mockNotifications.map((note) => (
          <div
            key={note.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition"
          >
            <div>{note.icon}</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{note.message}</p>
              <span className="text-xs text-gray-400">{note.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 text-center text-sm text-indigo-600 hover:underline cursor-pointer">
        View all
      </div>
    </div>
  )
}

export default Notification
