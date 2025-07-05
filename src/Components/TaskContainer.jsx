import React, { useState, useEffect } from 'react'
// import tasks from '../assets/Data/tasks.json'
import { Calendar1Icon } from 'lucide-react'
import { Link } from 'react-router'
import { useAuthStore } from '../Utils/useAuthStore'
import { db } from '../Utils/firebase'
import { onSnapshot, collection, getDoc, doc } from 'firebase/firestore'

const TaskContainer = () => {
  const [isLoading, setIsLoading]= useState(false)
  const [tasks, setTasks] = useState([])
  const { user } = useAuthStore()


useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
    setIsLoading(true)
    try {
      const taskList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(task => task.visibility !== 'Private' && task.uploadedBy !== user?.uid && !task.completedBy?.includes(user?.uid))

      setTasks(taskList)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setIsLoading(false)
    }
  })

  return () => unsubscribe()
}, [])


  return (
    <>
    { isLoading ? (
      <div className='flex items-center justify-center'>
        <div className='loader'></div>
      </div>
    ) : tasks.length === 0 ? (
      <div className='flex items-center justify-center'>Sorry, no Tasks available</div>
    ) :
        tasks?.map((task, i) => (
            <Link className="bg-white p-4 rounded-lg shadow-md w-full max-w-md space-y-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer" key={i}
            to={`/${task.id}`}>
  {/* Top Section */}
  <div className="flex justify-between items-center text-sm flex-wrap text-gray-500">
    <span className={` ${
          task.category === 'App/Website Engagement' 
            ? 'bg-blue-500 text-white' 
            : task.category === 'Creative Tasks' 
            ? 'bg-blue-400 text-white' 
            : task.category === 'Social Media' 
            ? 'bg-blue-300 text-black' 
            : task.category === 'Surveys & Feedback' 
            ? 'bg-blue-200 text-black' 
            : 'bg-blue-100 text-black'
        } px-2 py-0.5 rounded-full text-xs font-medium`}>{task.category}</span>
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