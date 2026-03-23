import React, { useState, useEffect } from 'react'
import { CalendarDays } from 'lucide-react'
import { Link } from 'react-router'
import { useAuthStore } from '../Utils/useAuthStore'
import { db } from '../Utils/firebase'
import { onSnapshot, collection } from 'firebase/firestore'

const categoryStyles = {
  'App/Website Engagement': { bg: 'bg-blue-50', text: 'text-blue-600' },
  'Creative Tasks':         { bg: 'bg-violet-50', text: 'text-violet-600' },
  'Social Media':           { bg: 'bg-pink-50', text: 'text-pink-600' },
  'Surveys & Feedback':     { bg: 'bg-amber-50', text: 'text-amber-600' },
}

const getCategoryStyle = (category) =>
  categoryStyles[category] || { bg: 'bg-gray-100', text: 'text-gray-500' }

const TaskContainer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const { user } = useAuthStore()

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      try {
        const taskList = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(task =>
            task.visibility !== 'Private' &&
            task.uploadedBy !== user?.uid &&
            !task.completedBy?.includes(user?.uid) &&
            !task.unapprovedApplicants?.includes(user?.uid)
          )
        setTasks(taskList)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <div className='col-span-full flex items-center justify-center h-48'>
        <div className='loader' />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className='col-span-full flex flex-col items-center justify-center h-48 gap-2'>
        <p className='text-sm text-gray-400'>No tasks available right now</p>
      </div>
    )
  }

  return tasks.map((task) => {
    const { bg, text } = getCategoryStyle(task.category)

    return (
      <Link
        key={task.id}
        to={`/exploretasks/${task.id}`}
        className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-200 hover:bg-gray-50 transition-all duration-150"
      >
        {/* Top row: category + uploader */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md ${bg} ${text}`}>
            {task.category}
          </span>
          <p className="text-[11px] text-gray-400 truncate max-w-[160px]">
            by <span className="text-gray-600 font-medium">{task.uploaderEmail}</span>
          </p>
        </div>

        {/* Title + description */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug">{task.title}</h3>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{task.description}</p>
        </div>

        {/* Footer: deadline + price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-gray-400">
            <CalendarDays size={12} />
            <span className="text-xs">{task.deadline}</span>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            ₦{task.commissionPrice}
          </span>
        </div>
      </Link>
    )
  })
}

export default TaskContainer