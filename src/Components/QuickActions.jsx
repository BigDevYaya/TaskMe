import React, { useState } from 'react'
import { PlusCircle, Compass, Mail } from 'lucide-react'
import TaskUploadModal from './uploadtask/TaskUploadModal'
import { Link } from 'react-router'

const QuickActions = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-3">⚡ Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 cursor-pointer"
          onClick={(() => setShowModal(true))}>
          <PlusCircle size={18}  /> Upload Task
        </div> 
        <Link className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
        to={'/exploretasks'}>
          <Compass size={18} /> Explore Tasks
        </Link>
        <Link className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
        to={'/messages'}>
          <Mail size={18} /> Messages
        </Link>
      </div>

      {showModal && (
        <TaskUploadModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default QuickActions
