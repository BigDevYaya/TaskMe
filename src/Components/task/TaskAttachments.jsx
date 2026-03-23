import React from 'react'
import { Paperclip, Download } from 'lucide-react'

const TaskAttachments = ({ attachments = [] }) => {
  if (!attachments || attachments.length === 0) return null

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden font-inter">
      <div className="px-5 py-3.5 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
        <Paperclip size={16} className="text-gray-500" />
        <h2 className="text-sm font-semibold text-gray-900">Attachments</h2>
      </div>
      
      <ul className="divide-y divide-gray-100">
        {attachments.map((file, i) => (
          <li key={i} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-700 truncate mr-4">{file.name}</span>
            <a 
              href={file.url} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
            >
              <Download size={14} /> Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskAttachments