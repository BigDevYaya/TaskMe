import React, { useState } from 'react'
import { useAuthStore } from '../../Utils/useAuthStore'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../Utils/firebase'
import { set } from 'date-fns'
import toast from 'react-hot-toast'
import { Formik } from 'formik'
import { submitTaskSchema } from '../../Utils/schemas/schema'
import { useMessageStore } from '../../Utils/useMessageStore'

const SubmissionForm = ({ taskId }) => {
  const [file, setFile] = useState(null)
  const { sendMessage } = useMessageStore()
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
  

  const handleSubmit = async (proof) => {
    setSubmitting(true)
    const isTaskCompleted = await checkIfTaskCompleted()
    if (!isTaskCompleted) {
    try{
      const taskDoc = await getDoc(doc(db, 'tasks', taskId))
      await updateDoc(doc(db, 'users', user.uid), {
        completedTasks: arrayUnion(taskId),
        totalEarnings: user.totalEarnings + taskDoc.data().commissionPrice
      } )
      await sendMessage({
        senderId: user.uid,
        receiverId: taskDoc.data().uploadedBy,
        text : proof,
        type: 'text'
      })

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUser({ ...user, ...userDoc.data() });
      }


      await updateDoc(doc(db, 'tasks', taskId), {
        completedBy : arrayUnion(user.uid)
      })
      toast.success('Task completed successfully!')
    } catch(err){
      console.error('An Error Ocurred: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  } else {
    toast.error('You have already completed this task.')
    setSubmitting(false)
  }
}

  return (
    <Formik
    initialValues={{
      proof: ''
    }}
    validationSchema={submitTaskSchema}
    onSubmit={async (values, actions) => {
      await handleSubmit(values.proof)
      actions.resetForm()
      actions.setSubmitting(false)
    }}
    >
      {
        props => (
          <form onSubmit={props.handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Submit Proof of Completion</h2>
            <div className='flex flex-col gap-4'>
              <textarea 
              name="proof" 
              id="proof"
              value={props.values.proof} 
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              className='border w-full rounded-lg text-black focus:outline-none p-0.5' 
              rows={3}></textarea>
              {
                props.touched.proof && props.errors.proof && (
                  <p className='text-red-500 text-sm'>{props.errors.proof}</p>
                )
              }
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
    </Formik>
  )
}

export default SubmissionForm