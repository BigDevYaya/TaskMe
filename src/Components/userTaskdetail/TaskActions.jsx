import React from 'react'

const TaskActions = () => {
  return (
    <div className="flex justify-between">
    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete Task</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Mark Task as Completed / Closed</button>
  </div>
  )
}

export default TaskActions