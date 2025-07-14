import React from 'react'

const TaskInfoCard = ({ task }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
    <h2 className="text-2xl font-semibold">Task Information</h2>
    <div className="grid grid-cols-2 gap-4">
      <div><strong>Title:</strong> {task.title}</div>
      <div><strong>Category:</strong> {task.category}</div>
      <div><strong>Reward:</strong> {task.reward}</div>
      <div><strong>Created Date:</strong> {task.createdDate}</div>
      <div><strong>Deadline:</strong> {task.deadline}</div>
    </div>
    <p className="mt-4"><strong>Description:</strong> {task.description}</p>
  </div>
  )
}

export default TaskInfoCard