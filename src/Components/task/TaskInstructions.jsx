import React from 'react'

const TaskInstructions = ({ instructions }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{instructions}</p>
    </div>
  )
}

export default TaskInstructions