import React, { useEffect, useState } from 'react'
import SubmissionItem from './SubmissionItem'

const SubmissionsCard = ({ task, submissions, pendingUsers, approvedUsers, onApprove, onReject }) => {
  const [users, setUsers] = useState([]);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 font-inter p-6 space-y-4">
    <h2 className="text-2xl font-semibold">Submissions</h2>
    <div className="grid grid-cols-3 gap-4">
      <div><strong>Pending:</strong> {pendingUsers?.length || 0}</div>
      <div><strong>Approved:</strong> {approvedUsers?.length || 0}</div>
    </div>

    <h3 className="text-xl font-medium mt-6">User Submissions</h3>
    <div className="space-y-4 max-h-80 overflow-y-scroll">
        {
          submissions.length ?
          submissions.map(submission => 
            <SubmissionItem
              task={task}
              key={submission.id}
              approvedUsers={approvedUsers}
              pendingUsers={pendingUsers}
              submission={submission}
              onApprove={onApprove}
              onReject={onReject}
            />
          ) : <div className='text-gray-500 w-full h-9 flex items-center justify-center'>Submission appear here</div>
        }
    </div>
  </div>
  )
}

export default SubmissionsCard