import React from 'react'

const TaskActions = ({ onClose }) => {
  return (
    <div className="flex justify-end pt-2">
      <button 
        className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors border border-transparent"
        onClick={onClose}
      >
        Close Task
      </button>
    </div>
  )
}

export default TaskActions