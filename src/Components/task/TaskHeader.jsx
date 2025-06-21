import React from 'react'
import { format } from 'date-fns'
import { User, Tag, Circle } from 'lucide-react'

const  TaskHeader = ({ title, category, uploader, status, reward, date }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Tag size={16}/> {category}</span>
          <span className="flex items-center gap-1"><User size={16}/> {uploader}</span>
          <span className="flex items-center gap-1"><Circle size={16}/> {format(date, 'PPP')}</span>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-sm ${status === 'open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{status}</span>
        <span className="font-semibold text-lg text-indigo-600">₦{reward}</span>
      </div>
    </div>
  )
}

export default TaskHeader