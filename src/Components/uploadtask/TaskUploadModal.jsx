import React, { useState } from 'react';
import { Formik } from 'formik';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { uploadTaskFunction } from '../../Utils/uploadTaskFunction';
import { uploadSchema } from '../../Utils/schemas/schema';
import { useAuthStore } from '../../Utils/useAuthStore';

const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-3">
    {children}
  </p>
)

const Field = ({ label, error, touched, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-medium text-gray-600">{label}</label>
    {children}
    {touched && error && (
      <p className="text-[11px] text-red-400">{error}</p>
    )}
  </div>
)

const inputCls = "h-10 w-full px-3 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
const selectCls = "h-10 w-full px-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white transition-colors appearance-none cursor-pointer"

const TaskUploadModal = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>

      {/* Panel — fixed height, internal scroll */}
      <div className="relative bg-white rounded-2xl w-full max-w-3xl flex flex-col"
        style={{ maxHeight: '90vh', border: '1px solid #e5e7eb' }}>

        {/* ── Header (sticky) ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-gray-900 leading-none">Create New Task</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">Fill in the details below to publish your task</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Scrollable form body ── */}
        <Formik
          initialValues={{
            taskName: '', taskDescription: '', taskInstructions: '',
            numberOfPeople: '', proofsNeeded: '', complexity: 'Simple',
            category: 'Social Media', commissionPrice: '', externalLink: '',
            proofFormat: '', deadline: '', visibility: 'Public', tags: '', termsAgreed: false
          }}
          validationSchema={uploadSchema}
          onSubmit={async (values, actions) => {
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
              toast.success('Task uploaded successfully')
            } catch (err) {
              toast.error('Error uploading task: ' + err.message)
            } finally {
              setIsLoading(false)
              actions.setSubmitting(false)
            }
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit} className="flex flex-col flex-1 min-h-0">

              {/* Scrollable area */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}>

                {/* BASIC INFO */}
                <div>
                  <SectionLabel>Basic Info</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Task Name" error={props.errors.taskName} touched={props.touched.taskName}>
                      <input name="taskName" type="text" placeholder="e.g. Design System Audit"
                        value={props.values.taskName} onChange={props.handleChange} onBlur={props.handleBlur}
                        className={inputCls} />
                    </Field>
                    <Field label="Task Description" error={props.errors.taskDescription} touched={props.touched.taskDescription}>
                      <input name="taskDescription" type="text" placeholder="Short internal summary"
                        value={props.values.taskDescription} onChange={props.handleChange} onBlur={props.handleBlur}
                        className={inputCls} />
                    </Field>
                  </div>
                </div>

                {/* DETAILS */}
                <div>
                  <SectionLabel>Details</SectionLabel>
                  <Field label="Instructions" error={props.errors.taskInstructions} touched={props.touched.taskInstructions}>
                    <textarea name="taskInstructions" rows={3} placeholder="Provide detailed steps for the assignee..."
                      value={props.values.taskInstructions} onChange={props.handleChange} onBlur={props.handleBlur}
                      className="w-full px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-white transition-colors resize-none" />
                  </Field>
                </div>

                {/* CONFIGURATION */}
                <div>
                  <SectionLabel>Configuration</SectionLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Field label="People Required" error={props.errors.numberOfPeople} touched={props.touched.numberOfPeople}>
                      <input name="numberOfPeople" type="number" min="1" placeholder="0"
                        value={props.values.numberOfPeople} onChange={props.handleChange} onBlur={props.handleBlur}
                        className={inputCls} />
                    </Field>
                    <Field label="Complexity" error={props.errors.complexity} touched={props.touched.complexity}>
                      <select name="complexity" value={props.values.complexity} onChange={props.handleChange} onBlur={props.handleBlur} className={selectCls}>
                        <option value="Simple">Simple</option>
                        <option value="Mid">Mid</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </Field>
                    <Field label="Price (₦)" error={props.errors.commissionPrice} touched={props.touched.commissionPrice}>
                      <input name="commissionPrice" type="number" min="0" step="0.01" placeholder="0.00"
                        value={props.values.commissionPrice} onChange={props.handleChange} onBlur={props.handleBlur}
                        className={inputCls} />
                    </Field>
                    <Field label="Deadline" error={props.errors.deadline} touched={props.touched.deadline}>
                      <input name="deadline" type="date"
                        value={props.values.deadline} onChange={props.handleChange} onBlur={props.handleBlur}
                        className={inputCls} />
                    </Field>
                  </div>
                </div>

                {/* CATEGORY & VISIBILITY */}
                <div>
                  <SectionLabel>Category & Visibility</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Category" error={props.errors.category} touched={props.touched.category}>
                      <select name="category" value={props.values.category} onChange={props.handleChange} onBlur={props.handleBlur} className={selectCls}>
                        <option value="Social Media">Social Media</option>
                        <option value="Surveys & Feedback">Surveys & Feedback</option>
                        <option value="App/Website Engagement">App/Website Engagement</option>
                        <option value="Creative Tasks">Creative Tasks</option>
                        <option value="Other">Other</option>
                      </select>
                    </Field>
                    <Field label="Visibility" error={props.errors.visibility} touched={props.touched.visibility}>
                      <select name="visibility" value={props.values.visibility} onChange={props.handleChange} onBlur={props.handleBlur} className={selectCls}>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                    </Field>
                  </div>
                </div>

                {/* PROOF REQUIREMENTS */}
                <div>
                  <SectionLabel>Proof Requirements</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Proofs Needed" error={props.errors.proofsNeeded} touched={props.touched.proofsNeeded}>
                      <input name="proofsNeeded" type="text" placeholder="Describe what proof is required"
                        value={props.values.proofsNeeded} onChange={props.handleChange} onBlur={props.handleBlur}
                        className={inputCls} />
                    </Field>
                    <Field label="Proof Format" error={props.errors.proofFormat} touched={props.touched.proofFormat}>
                      <input name="proofFormat" type="text" placeholder="e.g. Screenshot, Video, Link"
                        value={props.values.proofFormat} onChange={props.handleChange} onBlur={props.handleBlur}
                        className={inputCls} />
                    </Field>
                  </div>
                </div>

                {/* LINKS & TAGS */}
                <div>
                  <SectionLabel>Links & Tags</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="External Link" error={props.errors.externalLink} touched={props.touched.externalLink}>
                      <input name="externalLink" type="url" placeholder="https://example.com"
                        value={props.values.externalLink} onChange={props.handleChange} onBlur={props.handleBlur}
                        className={inputCls} />
                    </Field>
                    <Field label="Task Tags" error={props.errors.tags} touched={props.touched.tags}>
                      <input name="tags" type="text" placeholder="tag1, tag2, tag3"
                        value={props.values.tags} onChange={props.handleChange} onBlur={props.handleBlur}
                        className={inputCls} />
                    </Field>
                  </div>
                </div>

                {/* TERMS */}
                <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="termsAgreed"
                      checked={props.values.termsAgreed}
                      onChange={props.handleChange} onBlur={props.handleBlur}
                      className="mt-0.5 accent-blue-500 w-4 h-4 shrink-0" />
                    <span className="text-[13px] text-gray-600 leading-snug">
                      I agree not to request illegal or unethical tasks.
                    </span>
                  </label>
                  {props.touched.termsAgreed && props.errors.termsAgreed && (
                    <p className="text-[11px] text-red-400 mt-1.5 ml-7">{props.errors.termsAgreed}</p>
                  )}
                </div>

              </div>

              {/* ── Footer (sticky) ── */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 shrink-0">
                <button type="button" onClick={onClose}
                  className="h-10 px-5 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={props.isSubmitting || isLoading}
                  className="h-10 px-6 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Uploading…
                    </>
                  ) : 'Upload Task'}
                </button>
              </div>

            </form>
          )}
        </Formik>

        {/* Soft loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(2px)' }}>
            <div className="loader" />
          </div>
        )}

      </div>
    </div>
  );
};

export default TaskUploadModal;