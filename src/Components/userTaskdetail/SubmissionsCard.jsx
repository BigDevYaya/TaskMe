import React, { useEffect, useState } from 'react'
import SubmissionItem from './SubmissionItem'

const SubmissionsCard = ({ task, submissions, pendingUsers, approvedUsers, onApprove, onReject }) => {
  const [users, setUsers] = useState([]);
  
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
    <h2 className="text-2xl font-semibold">Submissions</h2>
    <div className="grid grid-cols-3 gap-4">
      <div><strong>Pending:</strong> {pendingUsers?.length || 0}</div>
      <div><strong>Approved:</strong> {approvedUsers?.length || 0}</div>
    </div>

    <h3 className="text-xl font-medium mt-6">User Submissions</h3>
    <div className="space-y-4">
        {
          submissions.map(submission => 
            <SubmissionItem
              key={submission.id}
              approvedUsers={approvedUsers}
              pendingUsers={pendingUsers}
              submission={submission}
              onApprove={onApprove}
              onReject={onReject}
            />
          )
        }
    </div>
  </div>
  )
}

export default SubmissionsCard