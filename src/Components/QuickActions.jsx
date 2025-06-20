import React from 'react'
import { PlusCircle, Compass, Mail } from 'lucide-react'
import { Link } from 'react-router'

const QuickActions = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-3">⚡ Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        <Link className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
          <PlusCircle size={18} /> Upload Task
        </Link>
        <Link className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
        to={'/exploretasks'}>
          <Compass size={18} /> Explore Tasks
        </Link>
        <Link className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
        to={'/messages'}>
          <Mail size={18} /> Messages
        </Link>
      </div>
    </div>
  )
}

export default QuickActions
