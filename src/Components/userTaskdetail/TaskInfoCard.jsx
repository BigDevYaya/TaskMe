import React from 'react';

const TaskInfoCard = ({ task }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden font-inter">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Task Details</h2>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
          <div>
            <dt className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Title</dt>
            <dd className="text-sm text-gray-900">{task.title}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</dt>
            <dd className="text-sm text-gray-900">{task.category}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Reward</dt>
            <dd className="text-sm font-medium text-green-600">{task.commissionPrice}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Deadline</dt>
            <dd className="text-sm text-gray-900">{task.deadline}</dd>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-4 border-t border-gray-100 pt-6 mt-2">
            <dt className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</dt>
            <dd className="text-sm text-gray-700 leading-relaxed max-w-3xl whitespace-pre-wrap">
              {task.description}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default TaskInfoCard;