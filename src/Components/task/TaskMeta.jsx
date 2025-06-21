import React from 'react'
import { Users, Calendar } from 'lucide-react'
import { format } from 'date-fns'

const TaskMeta = ({ performedCount, deadline }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex gap-6 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <Users size={16} className="text-gray-500" />
        <span>{performedCount || 0} users completed</span>
      </div>
      {deadline && (
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <span>Deadline: {format(deadline, 'PPP')}</span>
        </div>
      )}
    </div>
  )
}

export default TaskMeta