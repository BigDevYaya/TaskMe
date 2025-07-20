import React, { useEffect, useState } from 'react'
import { CalendarDays, BadgeCheck } from 'lucide-react'
import {  doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../Utils/firebase'
import { useAuthStore } from '../Utils/useAuthStore'





const RecentTasksList = () => {
  const [tasks, setTasks] = useState([])
  const { user } = useAuthStore()
useEffect(() => {
  const unSubscribes = []
  setTasks([]);
  const userLastThreeTasks = user?.completedTasks?.slice(0, 3) || []
  userLastThreeTasks.forEach(taskId => {
      const taskRef = doc(db, 'tasks', taskId)
      const unSub = onSnapshot(taskRef, taskSnap => {
        if(taskSnap.exists()){
          setTasks(prev => {
            const updatedTask = { ...taskSnap.data(), id: taskSnap.id };
            const withoutCurrent = prev.filter(t => t.id !== taskSnap.id);
            return [...withoutCurrent, updatedTask].sort((a,b) => {
              return userLastThreeTasks.indexOf(a.id) - userLastThreeTasks.indexOf(b.id)
            })
          })
        }
      })
      unSubscribes.push(unSub)
    });


  return () => {
    unSubscribes.forEach((unSub)=> unSub())
  };
    
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
