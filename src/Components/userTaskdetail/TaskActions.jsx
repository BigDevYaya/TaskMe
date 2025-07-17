import React from 'react'

const TaskActions = ({ onClose }) => {
  return (
    <div className="flex w-full">
    <div className='justify-end'>
      <button 
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={onClose}>Mark Task as Completed / Closed</button>
    </div>
  </div>
  )
}

export default TaskActions