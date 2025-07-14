import React, { useState } from 'react'
import TaskInfoCard from '../Components/userTaskdetail/TaskInfoCard'
import SubmissionsCard from '../Components/userTaskdetail/SubmissionsCard'
import TaskActions from '../Components/userTaskdetail/TaskActions'

const UserTaskDetail = () => {

    const task = {
    title: 'Follow on Instagram',
    description: 'Follow our Instagram page and like 3 recent posts.',
    category: 'Social Media',
    reward: '$2.00',
    createdDate: '2025-07-01',
    deadline: '2025-07-20',
    submissions: {
      picked: 10,
      submitted: 7,
      completed: 5,
    },
  };

  const [submissions, setSubmissions] = useState([
    { id: 1, user: 'John Doe', proof: 'https://instagram.com/proof1', status: 'pending' },
    { id: 2, user: 'Jane Smith', proof: 'https://instagram.com/proof2', status: 'approved' },
    { id: 3, user: 'Alice Brown', proof: 'https://instagram.com/proof3', status: 'pending' },
  ]);

  const handleApprove = (id) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s))
    );
  };

  const handleReject = (id) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'rejected' } : s))
    );
  };

  
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <TaskInfoCard task={task} />
      <SubmissionsCard task={task} submissions={submissions} onApprove={handleApprove} onReject={handleReject} />
      <TaskActions />
    </div>
  )
}

export default UserTaskDetail