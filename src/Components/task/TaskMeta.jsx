import React from 'react'
import { Users, Calendar } from 'lucide-react'
import { format } from 'date-fns'

const TaskMeta = ({ performedCount, deadline }) => {
  return (
    <div className="border border-gray-200 rounded-lg flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200 bg-white font-inter">
      <div className="flex items-center gap-3 px-5 py-3 flex-1">
        <Users size={16} className="text-gray-400" />
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Engagement</span>
          <span className="text-sm font-medium text-gray-900">
            {performedCount || 0} users completed
          </span>
        </div>
      </div>
      
      {deadline && (
        <div className="flex items-center gap-3 px-5 py-3 flex-1">
          <Calendar size={16} className="text-gray-400" />
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Deadline</span>
            <span className="text-sm font-medium text-gray-900">{format(deadline, 'PPP')}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskMeta