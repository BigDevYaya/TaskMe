import React, { useEffect, useState } from 'react'
import { CalendarDays, BadgeCheck } from 'lucide-react'
import {  doc, getDoc } from 'firebase/firestore'
import { db } from '../Utils/firebase'
import { useAuthStore } from '../Utils/useAuthStore'

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
  const [tasks, setTasks] = useState([])
  const { user } = useAuthStore()
  useEffect(() => {
  const fetchRecentTasks = async () => {
    setTasks([]);
    const userLastThreeTasks = user?.completedTasks?.slice(0, 3) || []
    const fetchedTasks = await Promise.all(
      userLastThreeTasks?.map(async (element) => {
        const task = await getDoc(doc(db, 'tasks', element))
        if (task.exists()) {
          return {...task.data(), id: task.id}
        } else {
          return null
        }
      })  
    );

    // Remove nulls and duplicates by id
    const uniqueTasks = [];
    const seen = new Set();
    for (const t of fetchedTasks.filter(Boolean)) {
      if (!seen.has(t.id)) {
        uniqueTasks.push(t);
        seen.add(t.id);
      }
    }
    setTasks(uniqueTasks);
  }

  fetchRecentTasks()
}, [user?.completedTasks])
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold mb-3 text-gray-800">🕒 Recent Tasks</h2>
      <ul className="space-y-3">
        {
          tasks.length === 0 ? (
            <p className='text-sm flex w-full h-64 text-gray-400 items-center justify-center'>No recent tasks available</p>
          ) :
        tasks.map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:shadow"
          >
            <div>
              <p className="font-semibold text-gray-700">{task.title}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <CalendarDays size={14} /> {task.createdAt?.toDate().toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-medium">₦{task.commissionPrice}</span>
              <BadgeCheck size={20} className="text-emerald-500" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentTasksList
