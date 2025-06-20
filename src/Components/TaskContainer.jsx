import React from 'react'
import tasks from '../assets/Data/tasks.json'
import { Calendar1Icon } from 'lucide-react'
import { Link } from 'react-router'

const TaskContainer = () => {
  return (
    <>
    {
        tasks?.map((task, i) => (
            <Link className="bg-white p-4 rounded-lg shadow-md w-full max-w-md space-y-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer" key={i}
            to={`/task-${i}`}>
  {/* Top Section */}
  <div className="flex justify-between items-center text-sm flex-wrap text-gray-500">
    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">{task.category}</span>
    <p>
      Uploaded by <span className="text-gray-800 font-semibold">{task.uploadedBy}</span>
    </p>
  </div>

  {/* Task Info */}
  <div>
    <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
    <p className="text-sm text-gray-700 mt-1">{task.description}</p>
  </div>

  {/* Footer Section */}
  <div className="flex justify-between items-center text-sm text-gray-600">
    <div className="flex items-center gap-1">
      <Calendar1Icon className="w-4 h-4 text-gray-500" />
      <span>{task.date}</span>
    </div>
    <p className="font-semibold text-green-600">₦{task.price}</p>
  </div>
</Link>

        ))
    }
    </>
  )
}

export default TaskContainer