import React, { useState } from 'react'

const SubmissionForm = ({ taskId }) => {
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    setSubmitting(true)
    setTimeout(() => {
      alert('Proof submitted!')
      setSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Submit Proof of Completion</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
      />
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