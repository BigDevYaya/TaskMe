import React from 'react'
import {
  CheckCircle,
  UploadCloud,
  Mail,
  Wallet,
} from 'lucide-react'

const stats = [
  {
    title: 'Tasks Completed',
    value: 12,
    icon: <CheckCircle size={28} className="text-green-600" />,
    bg: 'bg-green-50',
  },
  {
    title: 'Tasks Uploaded',
    value: 5,
    icon: <UploadCloud size={28} className="text-blue-600" />,
    bg: 'bg-blue-50',
  },
  {
    title: 'Earnings (₦)',
    value: 1550,
    icon: <Wallet size={28} className="text-yellow-600" />,
    bg: 'bg-yellow-50',
  },
  {
    title: 'Unread Messages',
    value: 3,
    icon: <Mail size={28} className="text-purple-600" />,
    bg: 'bg-purple-50',
  },
]

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-xl shadow-sm border border-gray-100 ${stat.bg} flex items-center justify-between`}
        >
          <div>
            <h2 className="text-xl font-bold text-gray-800">{stat.value}</h2>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
          <div className="p-2 rounded-full bg-white shadow-inner">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats
