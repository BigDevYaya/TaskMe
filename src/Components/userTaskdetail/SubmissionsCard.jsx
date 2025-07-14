import React from 'react'
import SubmissionItem from './SubmissionItem'

const SubmissionsCard = ({ task, submissions, onApprove, onReject }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
    <h2 className="text-2xl font-semibold">Submissions</h2>
    <div className="grid grid-cols-3 gap-4">
      <div><strong>Picked:</strong> {task.submissions.picked}</div>
      <div><strong>Submitted:</strong> {task.submissions.submitted}</div>
      <div><strong>Completed:</strong> {task.submissions.completed}</div>
    </div>

    <h3 className="text-xl font-medium mt-6">User Submissions</h3>
    <div className="space-y-4">
      {submissions.map((submission) => (
        <SubmissionItem
          key={submission.id}
          submission={submission}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  </div>
  )
}

export default SubmissionsCard