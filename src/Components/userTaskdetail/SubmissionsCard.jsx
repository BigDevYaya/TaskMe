import React from 'react'
import SubmissionItem from './SubmissionItem'

const SubmissionsCard = ({ task, submissions, pendingUsers, approvedUsers, onApprove, onReject }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden font-inter">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-gray-900">Submissions Review</h2>
        
        {/* Simple Stats */}
        <div className="flex gap-4 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            Pending: <span className="text-gray-900">{pendingUsers?.length || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Approved: <span className="text-gray-900">{approvedUsers?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {submissions.length > 0 ? (
          submissions.map(submission => 
            <SubmissionItem
              key={submission.id}
              task={task}
              submission={submission}
              onApprove={onApprove}
              onReject={onReject}
            />
          )
        ) : (
          <div className="p-8 text-center text-sm text-gray-500">
            No submissions to review yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default SubmissionsCard