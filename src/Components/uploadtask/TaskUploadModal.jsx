import React, { useState } from 'react';
import { Formik } from 'formik';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast'
import { uploadTaskFunction } from '../../Utils/uploadTaskFunction'
import { uploadSchema } from '../../Utils/schemas/schema';
import { useAuthStore } from '../../Utils/useAuthStore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../Utils/firebase';

 const TaskUploadModal = ({ isOpen, onClose }) => {
  const { user, applyForTask } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

 
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/55  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-11/12 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Create New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <Formik
        initialValues={{
          taskName: '',
          taskDescription: '',
          taskInstructions: '',
          numberOfPeople: '',
          proofsNeeded: '',
          complexity: 'Simple',
          category: 'Social Media',
          commissionPrice: '',
          externalLink: '',
          proofFormat: '',
          deadline: '',
          visibility: 'Public',
          tags: '',
          termsAgreed: false
        }}
        validationSchema={uploadSchema}
        onSubmit={ async (values, actions) => {
          try {
            setIsLoading(true)
            const task = {
              title: values.taskName,
              description: values.taskDescription,
              instructions: values.taskInstructions,
              numberOfPeople: values.numberOfPeople,
              proofsNeeded: values.proofsNeeded,
              complexity: values.complexity,
              category: values.category,
              commissionPrice: values.commissionPrice,
              externalLink: values.externalLink,
              proofFormat: values.proofFormat,
              deadline: values.deadline,
              visibility: values.visibility,
              tags: values.tags,
              termsAgreed: values.termsAgreed
            }

            await uploadTaskFunction(task, user.uid, user.email)
            actions.resetForm()
            onClose()
            toast.success('Task Uploaded Successfully')
          } catch(err) {
            toast.error('Error Uploading Task : ' + err.message)
            console.error(err)
          } finally {
            setIsLoading(false)
            actions.setSubmitting(false)
          }
        } }>
          {
            props => (
              <form 
              className="p-6 space-y-6"
              onSubmit={props.handleSubmit}>
          {/* Row 1: Basic Task Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Name
              </label>
              <input
                type="text"
                name="taskName"
                value={props.values.taskName}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="Enter task name"
              />
              { props.touched.taskName && props.errors.taskName && <div className='text-red-500 text-sm'>{props.errors.taskName}</div> }
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Description
              </label>
              <input
                type="text"
                name="taskDescription"
                value={props.values.taskDescription}
                onChange={props.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="Brief description of the task"
              />
              { props.touched.taskDescription && props.errors.taskDescription && <div className='text-red-500 text-sm'>{props.errors.taskDescription}</div> }
            </div>
          </div>

          {/* Row 2: Task Instructions (Full Width) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Instructions
            </label>
            <textarea
              name="taskInstructions"
              value={props.values.taskInstructions}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              placeholder="Detailed instructions for completing the task"
            />
            { props.touched.taskInstructions && props.errors.taskInstructions && <div className='text-red-500 text-sm'>{props.errors.taskInstructions}</div> }
          </div>

          {/* Row 3: Numbers & Complexity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Number of People Required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                People Required
              </label>
              <input
                type="number"
                name="numberOfPeople"
                value={props.values.numberOfPeople}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="e.g., 5"
              />
              { props.touched.numberOfPeople && props.errors.numberOfPeople && <div className='text-red-500 text-sm'>{props.errors.numberOfPeople}</div> }
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complexity
              </label>
              <select
                name="complexity"
                value={props.values.complexity}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              >
                <option value="Simple">Simple</option>
                <option value="Mid">Mid</option>
                <option value="Hard">Hard</option>
              </select>
              { props.touched.complexity && props.errors.complexity && <div className='text-red-500 text-sm'>{props.errors.complexity}</div> }
            </div>

            {/* Commission Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₦)
              </label>
              <input
                type="number"
                name="commissionPrice"
                value={props.values.commissionPrice}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="1500.00"
              />
              { props.touched.commissionPrice && props.errors.commissionPrice && <div className='text-red-500 text-sm'>{props.errors.commissionPrice}</div> }
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={props.values.deadline}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
              { props.touched.deadline && props.errors.deadline && <div className='text-red-500 text-sm'>{props.errors.deadline}</div> }
            </div>
          </div>

          {/* Row 4: Category & Visibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={props.values.category}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              >
                <option value="Social Media">Social Media</option>
                <option value="Surveys & Feedback">Surveys & Feedback</option>
                <option value="App/Website Engagement">App/Website Engagement</option>
                <option value="Creative Tasks">Creative Tasks</option>
                <option value="Other">Other</option>
              </select>
              { props.touched.category && props.errors.category && <div className='text-red-500 text-sm'>{props.errors.category}</div> }
            </div>

          </div>

          {/* Row 5: Proof Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Proofs Needed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proofs Needed
              </label>
              <input
                type="text"
                name="proofsNeeded"
                value={props.values.proofsNeeded}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="What proof is required for task completion"
              />
              { props.touched.proofsNeeded && props.errors.proofsNeeded && <div className='text-red-500 text-sm'>{props.errors.proofsNeeded}</div> }
            </div>

            {/* Proof Format Required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proof Format Required
              </label>
              <input
                type="text"
                name="proofFormat"
                value={props.values.proofFormat}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="e.g., Screenshot, Video, Link"
              />
              { props.touched.proofFormat && props.errors.proofFormat && <div className='text-red-500 text-sm'>{props.errors.proofFormat}</div> }
            </div>
          </div>

          {/* Row 6: Links & Tags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* External Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                External Link
              </label>
              <input
                type="url"
                name="externalLink"
                value={props.values.externalLink}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="https://example.com"
              />
              { props.touched.externalLink && props.errors.externalLink && <div className='text-red-500 text-sm'>{props.errors.externalLink}</div> }
            </div>

            {/* Task Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Tags
              </label>
              <input
                type="text"
                name="tags"
                value={props.values.tags}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="tag1, tag2, tag3"
              />
              { props.touched.tags && props.errors.tags && <div className='text-red-500 text-sm'>{props.errors.tags}</div> }
            </div>
          </div>

          {/* Row 7: File Upload (Full Width) */}
          

          {/* Terms Agreement */}
          <div>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={props.values.termsAgreed}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className="mt-1 text-blue-500 focus:ring-blue-300 rounded"
              />
              <span className="text-sm text-gray-700">
                I agree not to request illegal or unethical tasks.
              </span>
            </label>
            { props.touched.termsAgreed && props.errors.termsAgreed && <div className='text-red-500 text-sm'>{props.errors.termsAgreed}</div> }
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 lg:flex-col space-x-4 pt-6 border-t border-gray-200">
            {
              isLoading ? <div className='flex w-full items-center justify-center'>
                <div className='loader'></div>
              </div> : (
                <>
                <button
              type='submit'
              disabled={props.isSubmitting || isLoading}
              className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium">
              {
                isLoading ? 'Uploading task' : 'Upload Task'
              }
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              Cancel
            </button>
            </>
              ) 
            }
          </div>
        </form>
            )
          }
        </Formik>
      </div>
    </div>
  );
};

export default TaskUploadModal