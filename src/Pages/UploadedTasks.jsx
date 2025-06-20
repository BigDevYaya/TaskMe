import React, { useEffect, useState } from 'react'
import { CalendarDays, Trash2, Pencil } from 'lucide-react'
import { mockTasks } from '../assets/Data/mockTasks'



const UploadedTasks = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // Pretend to fetch user tasks from backend
    setTasks(mockTasks)
  }, [])

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📤 Uploaded Tasks</h1>

      {tasks?.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">You haven’t uploaded any tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{task.category}</span>
                <span className="flex items-center gap-1"><CalendarDays size={16} /> {task.date}</span>
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
