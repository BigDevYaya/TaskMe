import React, { useState } from 'react'
import { useAuthStore } from '../../Utils/useAuthStore'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../Utils/firebase'
import toast from 'react-hot-toast'
import { Formik } from 'formik'
import { submitTaskSchema } from '../../Utils/schemas/schema'
import { useMessageStore } from '../../Utils/useMessageStore'

const SubmissionForm = ({ taskId }) => {
  const { sendMessage } = useMessageStore()
  const [submitting, setSubmitting] = useState(false)
  const authStore = useAuthStore.getState()
  const user = authStore.user

  const checkIfTaskCompleted = async () => {
    const taskDoc = await getDoc(doc(db, 'tasks', taskId))
    if (taskDoc.exists()) {
      const completedBy = taskDoc.data().completedBy || []
      const pendingApplicants = taskDoc.data().unapprovedApplicants || []
      return completedBy.includes(user.uid) || pendingApplicants.includes(user.uid)
    }
    return false
  }
  
  const handleSubmit = async (proof) => {
    setSubmitting(true)
    const isTaskCompleted = await checkIfTaskCompleted()
    
    if (!isTaskCompleted) {
      try {
        const taskDoc = await getDoc(doc(db, 'tasks', taskId))
        
        await sendMessage({
          senderId: user.uid,
          receiverId: taskDoc.data().uploadedBy,
          text : `${proof} --- for completion for task ${taskDoc.data().title}`,
          type: 'text'
        })

        await authStore.applyForTask(user.uid, taskId)
        await authStore.addNotification(taskDoc.data().uploadedBy, `You received a new message from ${user.uname}`, "message")

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          authStore.setUser({ ...user, ...userDoc.data() });
        }

        toast.success('Proof Submitted successfully!')
      } catch(err) {
        console.error('An Error Ocurred: ' + err)
      } finally {
        setSubmitting(false)
      }
    } else {
      toast.error('Proof still under review or already submitted.')
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ proof: '' }}
      validationSchema={submitTaskSchema}
      onSubmit={async (values, actions) => {
        await handleSubmit(values.proof)
        actions.resetForm()
        actions.setSubmitting(false)
      }}
    >
      {props => (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden font-inter">
          <div className="px-5 py-3.5 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-sm font-semibold text-gray-900">Submit Proof of Completion</h2>
          </div>
          
          <form onSubmit={props.handleSubmit} className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="proof" className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Evidence Link / Notes</label>
              <textarea 
                name="proof" 
                id="proof"
                value={props.values.proof} 
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                placeholder="Enter your proof of completion here..."
                className={`w-full text-sm rounded-md border p-3 focus:outline-none focus:ring-1 focus:border-gray-900 transition-colors ${
                  props.touched.proof && props.errors.proof ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'
                }`}
                rows={4}
              />
              {props.touched.proof && props.errors.proof && (
                <p className="text-xs font-medium text-red-500 mt-1">{props.errors.proof}</p>
              )}
            </div>
            
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gray-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Proof'}
              </button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  )
}

export default SubmissionForm