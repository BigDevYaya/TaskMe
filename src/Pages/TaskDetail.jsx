import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import TaskHeader from '../Components/task/TaskHeader'
import TaskInstructions from '../Components/task/TaskInstructions'
import TaskAttachments from '../Components/task/TaskAttachments'
import TaskMeta from '../Components/task/TaskMeta'
import SubmissionForm from '../Components/task/SubmissionForm'
import { collection, getDoc,doc } from 'firebase/firestore'
import { db } from '../Utils/firebase'



export default function TaskDetailPage() {
  const { taskId } = useParams()
  const [taskDetails, setTaskDetails] = useState({})
  const [uploaderEmail, setUploaderEmail] = useState('')
  const fake = taskId.slice(-1)
  // const task = demoTasks.find(t => t.id === fake)

  useEffect(() => {
  const fetchTaskdetails = async () => {
    try{
      const taskDoc = await getDoc(doc(db, 'tasks', taskId))
      if(taskDoc.exists()) {
        const taskData = taskDoc.data()
        const taskCreatorId = taskData.uploadedBy
        const taskCreator = await getDoc(doc(db, 'users', taskCreatorId))
        const taskCreatorData = taskCreator.data()
        setUploaderEmail(taskCreatorData.email)
        setTaskDetails(taskData)
      }
    } catch(err) {
      console.error('An Error Ocurred: ', err.message)
    }
  }

  fetchTaskdetails()
}, [])

  if (!taskDetails) return <p className="p-6 text-center">Task not found.</p>

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <TaskHeader
        title={taskDetails.title}
        category={taskDetails.category}
        uploader={uploaderEmail}
        status={taskDetails.status}
        reward={taskDetails.commissionPrice}
        date={taskDetails.createdAt?.toDate()}
      />
      <TaskMeta
        requiredCount={taskDetails.numberOfPeople}
        performedCount={taskDetails.completedBy.length}
        deadline={taskDetails.deadline}
      />
      <TaskInstructions 
      instructions={taskDetails.instructions} 
      />
      <TaskAttachments 
      attachments={taskDetails.attachments} 
      />
      <SubmissionForm 
      taskId={taskId} 
      />
    </div>
  )
}
