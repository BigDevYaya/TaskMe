import React from 'react'
import { Paperclip } from 'lucide-react'

export default function TaskAttachments({ attachments = [] }) {
  if (!attachments.length) return null
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Paperclip size={18}/> Attachments
      </h2>
      <ul className="space-y-2">
        {attachments.map((file, i) => (
          <li key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <span className="text-gray-700">{file.name}</span>
            <a href={file.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Download</a>
          </li>
        ))}
      </ul>
    </div>
  )
}