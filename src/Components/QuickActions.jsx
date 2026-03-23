import React, { useState } from 'react'
import { PlusCircle, Compass, Mail } from 'lucide-react'
import TaskUploadModal from './uploadtask/TaskUploadModal'
import { Link } from 'react-router'

const actions = [
  { label: 'Upload Task', icon: PlusCircle, type: 'button' },
  { label: 'Explore Tasks', icon: Compass, type: 'link', to: '/exploretasks' },
  { label: 'Messages', icon: Mail, type: 'link', to: '/messages' },
]

const QuickActions = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm">⚡</span>
        <h2 className="text-sm font-semibold text-gray-800">Quick Actions</h2>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
        >
          <PlusCircle size={15} className="text-gray-400" />
          Upload Task
        </button>

        <Link
          to="/exploretasks"
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
        >
          <Compass size={15} className="text-gray-400" />
          Explore Tasks
        </Link>

        <Link
          to="/messages"
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
        >
          <Mail size={15} className="text-gray-400" />
          Messages
        </Link>
      </div>

      {showModal && (
        <TaskUploadModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default QuickActions