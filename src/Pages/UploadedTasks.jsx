import React, { useEffect, useState } from 'react'
import { CalendarDays, Trash2, Pencil } from 'lucide-react'
import { mockTasks } from '../assets/Data/mockTasks'
import { useAuthStore } from '../Utils/useAuthStore'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Utils/firebase'



const UploadedTasks = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState([])

  useEffect(() => {
  const fetchUploadedTasks = async () => {
    setIsLoading(true)
    if (!user?.uploadedTasks || user.uploadedTasks.length === 0) {
      setTasks([])
      setIsLoading(false)
      return
    }

    try {
      const taskPromises = user.uploadedTasks.map(async (taskId) => {
        const docRef = doc(db, 'tasks', taskId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          console.log(docSnap.data())
          return { id: docSnap.id, ...docSnap.data() }
        } else {
          return null
        }
      })

      const resolvedTasks = await Promise.all(taskPromises)
      const filtered = resolvedTasks.filter(task => task !== null)
      setTasks(filtered)
      
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if(user) {
    fetchUploadedTasks()
  }
}, [user])
console.log('User:', user)
console.log(user?.uploadedTasks, tasks)

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📤 Uploaded Tasks</h1>

      {isLoading ? (
        <div className="loader"></div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">You haven’t uploaded any tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{task.category}</span>
                <span className="flex items-center gap-1"><CalendarDays size={16} /> {task.deadline || new Date(task.createdAt?.seconds * 1000).toLocaleDateString()}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-semibold">₦{task.price}</span>
                <div className="flex gap-2 text-gray-500">
                  <Pencil className="cursor-pointer hover:text-blue-600" size={18} />
                  <Trash2 className="cursor-pointer hover:text-red-500" size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadedTasks
