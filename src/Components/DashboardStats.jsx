import React from 'react'
import { CheckCircle, UploadCloud, Mail, Wallet } from 'lucide-react'
import { useAuthStore } from '../Utils/useAuthStore'

const DashboardStats = () => {
  const { user } = useAuthStore()

  const stats = [
    {
      title: 'TASKS COMPLETED',
      value: [...new Set(user?.completedTasks)]?.length || 0,
      trend: '+12%',
      trendUp: true,
      icon: <CheckCircle size={16} className="text-gray-400" />,
    },
    {
      title: 'TASKS UPLOADED',
      value: user?.uploadedTasks?.length || 0,
      trend: 'Steady',
      trendUp: null,
      icon: <UploadCloud size={16} className="text-gray-400" />,
    },
    {
      title: 'EARNINGS (₦)',
      value: user?.totalEarnings
        ? `${(user.totalEarnings / 1000).toFixed(1)}k`
        : 0,
      trend: '+5.2%',
      trendUp: true,
      icon: <Wallet size={16} className="text-gray-400" />,
    },
    {
      title: 'UNREAD MESSAGES',
      value: user?.unreadMessages || 0,
      trend: `${user?.unreadMessages || 0} New`,
      trendUp: null,
      icon: <Mail size={16} className="text-gray-400" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col justify-between gap-3"
        >
          {/* Top row */}
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-gray-400">
              {stat.title}
            </p>
            {stat.icon}
          </div>

          {/* Value */}
          <p className="text-[28px] font-bold text-gray-900 leading-none">
            {stat.value}
          </p>

          {/* Trend */}
          <p className={`text-xs font-medium ${
            stat.trendUp === true
              ? 'text-emerald-500'
              : stat.trendUp === false
              ? 'text-red-400'
              : 'text-gray-400'
          }`}>
            {stat.trend}
          </p>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats