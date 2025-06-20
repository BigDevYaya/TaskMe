import React from 'react'
import { CalendarDays, BadgeCheck } from 'lucide-react'

const mockTasks = [
  {
    id: 1,
    title: 'Follow Instagram account',
    date: '2025-06-17',
    price: 50,
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Answer a 5-minute survey',
    date: '2025-06-16',
    price: 100,
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Write product review',
    date: '2025-06-15',
    price: 80,
    status: 'Completed',
  },
]

const RecentTasksList = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold mb-3 text-gray-800">🕒 Recent Tasks</h2>
      <ul className="space-y-3">
        {mockTasks.map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:shadow"
          >
            <div>
              <p className="font-semibold text-gray-700">{task.title}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <CalendarDays size={14} /> {task.date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-medium">₦{task.price}</span>
              <BadgeCheck size={20} className="text-emerald-500" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentTasksList
