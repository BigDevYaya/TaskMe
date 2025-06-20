import React from 'react'
import { useParams } from 'react-router'
import TaskHeader from '../components/task/TaskHeader'
import TaskInstructions from '../components/task/TaskInstructions'
import TaskAttachments from '../components/task/TaskAttachments'
import TaskMeta from '../components/task/TaskMeta'
import SubmissionForm from '../components/task/SubmissionForm'

const demoTasks = [
  {
    id: '0',
    title: 'Follow us on Instagram',
    category: 'Social Media',
    postedBy: 'Israel Yaya',
    status: 'open',
    price: 50,
    createdAt: new Date(),
    performedCount: 24,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    description: 'Follow our Instagram account and like the 3 most recent posts.',
    attachments: [
      { name: 'Example Screenshot.png', url: '#' },
    ],
  },
  {
    id: '1',
    title: 'Submit Product Survey',
    category: 'Survey',
    postedBy: 'Grace Noah',
    status: 'open',
    price: 100,
    createdAt: new Date(),
    performedCount: 10,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    description: 'Complete this short product survey to help improve our service.',
    attachments: [],
  },
  // Add more demo tasks as needed
]

export default function TaskDetailPage() {
  const { taskId } = useParams()
  const fake = taskId.slice(-1)
  const task = demoTasks.find(t => t.id === fake)

  if (!task) return <p className="p-6 text-center">Task not found.</p>

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <TaskHeader
        title={task.title}
        category={task.category}
        uploader={task.postedBy}
        status={task.status}
        reward={task.price}
        date={task.createdAt}
      />
      <TaskMeta
        performedCount={task.performedCount}
        deadline={task.deadline}
      />
      <TaskInstructions instructions={task.description} />
      <TaskAttachments attachments={task.attachments} />
      <SubmissionForm taskId={task.id} />
    </div>
  )
}
