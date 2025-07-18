import React from 'react';

const TaskInfoCard = ({ task }) => {
  return (
    <div className=" mx-auto bg-white rounded-xl p-6 sm:p-8 space-y-6 border border-gray-200 font-inter">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6 border-b-2 border-gray-300 pb-3">
        Task Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-gray-700">
        <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
          <strong className="text-gray-600 text-lg sm:text-xl mb-1">Title:</strong>
          <span className="text-gray-700 text-base sm:text-lg">{task.title}</span>
        </div>
        <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
          <strong className="text-gray-600 text-lg sm:text-xl mb-1">Category:</strong>
          <span className="text-gray-700 text-base sm:text-lg">{task.category}</span>
        </div>
        <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
          <strong className="text-gray-600 text-lg sm:text-xl mb-1">Reward:</strong>
          <span className="text-green-700 font-semibold text-base sm:text-lg">{task.commissionPrice}</span>
        </div>
        <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
          <strong className="text-gray-600 text-lg sm:text-xl mb-1">Created Date:</strong>
          <span className="text-gray-700 text-base sm:text-lg">{task.createdAt?.seconds && new Date(task.createdAt * 1000).toDateString()}</span>
        </div>
        <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
          <strong className="text-gray-600 text-lg sm:text-xl mb-1">Deadline:</strong>
          <span className="text-red-600 font-medium text-base sm:text-lg">{task.deadline}</span>
        </div>
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <strong className="text-gray-600 text-lg sm:text-xl mb-2 block">Description:</strong>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{task.description}</p>
      </div>
    </div>
  );
};

export default TaskInfoCard;
