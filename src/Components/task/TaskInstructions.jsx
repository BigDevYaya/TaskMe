import React from 'react'

const TaskInstructions = ({ instructions }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden font-inter">
      <div className="px-5 py-3.5 border-b border-gray-200 bg-gray-50/50">
        <h2 className="text-sm font-semibold text-gray-900">Instructions</h2>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
          {instructions}
        </p>
      </div>
    </div>
  )
}

export default TaskInstructions