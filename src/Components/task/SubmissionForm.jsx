import React, { useState } from 'react'
import { useAuthStore } from '../../Utils/useAuthStore'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../Utils/firebase'
import { set } from 'date-fns'
import toast from 'react-hot-toast'

const SubmissionForm = ({ taskId }) => {
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const { user, setUser } = useAuthStore()

  const checkIfTaskCompleted = async () => {
    const taskDoc = await getDoc(doc(db, 'tasks', taskId))
    if (taskDoc.exists()) {
      const completedBy = taskDoc.data().completedBy || []
      return completedBy.includes(user.uid)
    }
    return false
  }
  

  const handleSubmit = async (e) => {
    setSubmitting(true)
    e.preventDefault()
    const isTaskCompleted = await checkIfTaskCompleted()
    if (!isTaskCompleted) {
    try{
      const taskDoc = await getDoc(doc(db, 'tasks', taskId))
      await updateDoc(doc(db, 'users', user.uid), {
        completedTasks: arrayUnion(taskId),
        totalEarnings: user.totalEarnings + taskDoc.data().commissionPrice
      } )

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUser({ ...user, ...userDoc.data() });
      }


      await updateDoc(doc(db, 'tasks', taskId), {
        completedBy : arrayUnion(user.uid)
      })
      toast.success('Task completed successfully!')
    } catch(err){
      toast.error('An Error Ocurred: ', err.message)
    } finally {
      setSubmitting(false)
    }
  } else {
    toast.error('You have already completed this task.')
    setSubmitting(false)
  }
}

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Submit Proof of Completion</h2>
      <div className='flex flex-col gap-4'>
        <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        />
        <textarea name="text" id="text" className='border w-full rounded-lg text-black focus:outline-none p-0.5' rows={3}></textarea>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default SubmissionForm