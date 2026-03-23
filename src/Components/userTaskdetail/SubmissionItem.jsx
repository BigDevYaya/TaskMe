import React from 'react'
import { useAuthStore } from '../../Utils/useAuthStore'

const SubmissionItem = ({ task, submission, onApprove, onReject }) => {
  const { addNotification } = useAuthStore();
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-green-50 text-green-700 border border-green-200/60">Approved</span>;
      case 'rejected': 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-red-50 text-red-700 border border-red-200/60">Rejected</span>;
      default: 
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-yellow-50 text-yellow-800 border border-yellow-200/60">Pending</span>;
    }
  }

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{submission.user}</span>
          {getStatusBadge(submission.status)}
        </div>
        <a href='#' target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline hover:text-blue-700 font-medium">
          View Evidence ↗
        </a>
      </div>
      
      {submission.status === 'pending' && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onReject(submission.id)}
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={async () => {
              await onApprove(submission.id)
              await addNotification(submission.id, `You received ₦${task.commissionPrice} for completing ${task.title}`, "payment")
            }}
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-gray-900 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  )
}

export default SubmissionItem