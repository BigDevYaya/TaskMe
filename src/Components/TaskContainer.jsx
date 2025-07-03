import React, { useState, useEffect } from 'react'
// import tasks from '../assets/Data/tasks.json'
import { Calendar1Icon } from 'lucide-react'
import { Link } from 'react-router'
import { useAuthStore } from '../Utils/useAuthStore'
import { db } from '../Utils/firebase'
import { getDocs, collection, getDoc, doc } from 'firebase/firestore'

const TaskContainer = () => {
  const [isLoading, setIsLoading]= useState(false)
  const [tasks, setTasks] = useState([])
  const { user } = useAuthStore()


useEffect(() => {
  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const snapshot = await getDocs(collection(db, 'tasks'))

      // Fetch only public tasks
      const taskList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(task => task.visibility !== 'Private' && task.uploadedBy !== user?.uid)

      // Get all unique user IDs
      const uploaderIds = [...new Set(taskList.map(task => task.uploadedBy))]

      // Fetch all user documents (in parallel)
      const userDocs = await Promise.all(
        uploaderIds.map(uid => getDoc(doc(db, 'users', uid)))
      )

      // Create a map from uid to email
      const userEmailMap = {}
      userDocs.forEach(userDoc => {
        if (userDoc.exists()) {
          const userData = userDoc.data()
          userEmailMap[userDoc.id] = userData.email
        }
      })

      // Attach email to each task
      const enrichedTasks = taskList.map(task => ({
        ...task,
        uploaderEmail: userEmailMap[task.uploadedBy] || "Unknown User"
      }))

      setTasks(enrichedTasks)
    } catch (error) {
      console.error('Failed to fetch tasks or users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  fetchTasks()
}, [])

  return (
    <>
    { isLoading ? (
      <div className='loader flex items-center justify-center'></div>
    ) : tasks.length === 0 ? (
      <div className='flex items-center justify-center'>Sorry, no Tasks available</div>
    ) :
        tasks?.map((task, i) => (
            <Link className="bg-white p-4 rounded-lg shadow-md w-full max-w-md space-y-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer" key={i}
            to={`/${task.id}`}>
  {/* Top Section */}
  <div className="flex justify-between items-center text-sm flex-wrap text-gray-500">
    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">{task.category}</span>
    <p>
      Uploaded by <span className="text-gray-800 font-semibold">{task.uploaderEmail}</span>
    </p>
  </div>

  {/* Task Info */}
  <div>
    <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
    <p className="text-sm text-gray-700 mt-1">{task.description}</p>
  </div>

  {/* Footer Section */}
  <div className="flex justify-between items-center text-sm text-gray-600">
    <div className="flex items-center gap-1">
      <Calendar1Icon className="w-4 h-4 text-gray-500" />
      <span>{task.deadline}</span>
    </div>
    <p className="font-semibold text-green-600">₦{task.commissionPrice}</p>
  </div>
</Link>

        ))
    }
    </>
  )
}

export default TaskContainer