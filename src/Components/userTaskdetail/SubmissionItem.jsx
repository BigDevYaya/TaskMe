import React from 'react'
import { useAuthStore } from '../../Utils/useAuthStore'

const SubmissionItem = ({ task, submission, onApprove, onReject, approvedUsers, pendingUsers }) => {
  const { addNotification } = useAuthStore();
  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
    <div>
      <p><strong>User:</strong> {submission.user}</p>
      <p><strong>Proof:</strong> <a href='#' target="_blank" rel="noopener noreferrer" className="text-blue-500">View Proof</a></p>
      <p>
        <strong>Status:</strong>
        <span className={`capitalize ml-2 ${submission.status === 'approved' ? 'text-green-600' : submission.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
          {submission.status}
        </span>
      </p>
    </div>
    <div className="flex gap-2">
      <button
        onClick={async () => {
          await onApprove(submission.id)
          await addNotification(submission.id, `You received payment for completing ${task.name}`, "payment")
        }}
        className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100"
      >
        Approve
      </button>
      <button
        onClick={() => onReject(submission.id)}
        className="border border-red-500 text-red-500 rounded px-3 py-1 hover:bg-red-50"
      >
        Reject
      </button>
    </div>
  </div>
  )
}

export default SubmissionItem