import React, { useEffect, useState } from 'react'
import { CalendarDays, BadgeCheck, Clock } from 'lucide-react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Utils/firebase'
import { useAuthStore } from '../Utils/useAuthStore'

const RecentTasksList = () => {
  const [tasks, setTasks] = useState([])
  const { user } = useAuthStore()

  useEffect(() => {
    const unSubscribes = []
    setTasks([])
    const userLastThreeTasks = user?.completedTasks?.slice(0, 3) || []

    userLastThreeTasks.forEach(taskId => {
      const taskRef = doc(db, 'tasks', taskId)
      const unSub = onSnapshot(taskRef, taskSnap => {
        if (taskSnap.exists()) {
          setTasks(prev => {
            const updated = { ...taskSnap.data(), id: taskSnap.id }
            const without = prev.filter(t => t.id !== taskSnap.id)
            return [...without, updated].sort((a, b) =>
              userLastThreeTasks.indexOf(a.id) - userLastThreeTasks.indexOf(b.id)
            )
          })
        }
      })
      unSubscribes.push(unSub)
    })

    return () => unSubscribes.forEach(u => u())
  }, [user?.completedTasks])

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-800">Recent Tasks</h2>
        </div>
        <button className="text-xs font-medium text-blue-500 hover:underline">
          View All
        </button>
      </div>

      {/* List */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-56 gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <Clock size={18} className="text-gray-300" />
          </div>
          <p className="text-sm text-gray-400">No recent tasks available</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex justify-between items-center px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <CalendarDays size={11} />
                  {task.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  ₦{task.commissionPrice}
                </span>
                <BadgeCheck size={16} className="text-emerald-500" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RecentTasksList