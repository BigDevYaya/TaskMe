import React from 'react'
import { User, Tag, CalendarClock } from 'lucide-react'

// Added default values to the props so they are never undefined
const TaskHeader = ({ 
  title = 'Loading...', 
  category = 'Uncategorized', 
  uploader = 'Unknown User', 
  status = 'pending', // Default status prevents the crash
  reward = 0, 
  date 
}) => {
  
  // Safely handle the date so it doesn't crash if date is missing
  const formattedDate = date ? new Date(date).toLocaleString() : 'Fetching date...';

  return (
    <div className="pb-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
            status?.toLowerCase() === 'open' 
              ? 'bg-green-50 text-green-700 border-green-200/60' 
              : 'bg-yellow-50 text-yellow-800 border-yellow-200/60'
          }`}>
            {/* Safe uppercase fallback */}
            {(status || 'pending').toUpperCase()}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5"><Tag size={14} className="text-gray-400" /> {category}</span>
          <span className="flex items-center gap-1.5"><User size={14} className="text-gray-400" /> {uploader}</span>
          <span className="flex items-center gap-1.5"><CalendarClock size={14} className="text-gray-400" /> {formattedDate}</span>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end">
        <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Reward</span>
        <span className="font-semibold text-base text-green-600">₦{reward}</span>
      </div>
    </div>
  )
}

export default TaskHeader