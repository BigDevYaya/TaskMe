import React, { useState } from 'react';
import { X } from 'lucide-react';

 const TaskUploadModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    taskInstructions: '',
    numberOfPeople: '',
    proofsNeeded: '',
    complexity: 'Simple',
    category: 'Social Media',
    commissionPrice: '',
    externalLink: '',
    proofFormat: '',
    deadline: '',
    attachments: null,
    visibility: 'Public',
    tags: '',
    termsAgreed: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files : value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      taskName: '',
      taskDescription: '',
      taskInstructions: '',
      numberOfPeople: '',
      proofsNeeded: '',
      complexity: 'Simple',
      category: 'Social Media',
      commissionPrice: '',
      externalLink: '',
      proofFormat: '',
      deadline: '',
      attachments: null,
      visibility: 'Public',
      tags: '',
      termsAgreed: false
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/55  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-11/12 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Create New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Row 1: Basic Task Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Name
              </label>
              <input
                type="text"
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="Enter task name"
              />
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Description
              </label>
              <input
                type="text"
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="Brief description of the task"
              />
            </div>
          </div>

          {/* Row 2: Task Instructions (Full Width) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Instructions
            </label>
            <textarea
              name="taskInstructions"
              value={formData.taskInstructions}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              placeholder="Detailed instructions for completing the task"
            />
          </div>

          {/* Row 3: Numbers & Complexity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Number of People Required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                People Required
              </label>
              <input
                type="number"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="e.g., 5"
              />
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complexity
              </label>
              <select
                name="complexity"
                value={formData.complexity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              >
                <option value="Simple">Simple</option>
                <option value="Mid">Mid</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Commission Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₦)
              </label>
              <input
                type="number"
                name="commissionPrice"
                value={formData.commissionPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="1500.00"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
            </div>
          </div>

          {/* Row 4: Category & Visibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              >
                <option value="Social Media">Social Media</option>
                <option value="Surveys & Feedback">Surveys & Feedback</option>
                <option value="App/Website Engagement">App/Website Engagement</option>
                <option value="Creative Tasks">Creative Tasks</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Task Visibility */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Visibility
              </label>
              <div className="flex space-x-6 pt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="Public"
                    checked={formData.visibility === 'Public'}
                    onChange={handleInputChange}
                    className="text-blue-500 focus:ring-blue-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Public</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="Private"
                    checked={formData.visibility === 'Private'}
                    onChange={handleInputChange}
                    className="text-blue-500 focus:ring-blue-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Private</span>
                </label>
              </div>
            </div>
          </div>

          {/* Row 5: Proof Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Proofs Needed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proofs Needed
              </label>
              <input
                type="text"
                name="proofsNeeded"
                value={formData.proofsNeeded}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="What proof is required for task completion"
              />
            </div>

            {/* Proof Format Required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proof Format Required
              </label>
              <input
                type="text"
                name="proofFormat"
                value={formData.proofFormat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="e.g., Screenshot, Video, Link"
              />
            </div>
          </div>

          {/* Row 6: Links & Tags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* External Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                External Link
              </label>
              <input
                type="url"
                name="externalLink"
                value={formData.externalLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="https://example.com"
              />
            </div>

            {/* Task Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          {/* Row 7: File Upload (Full Width) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Attachments
            </label>
            <input
              type="file"
              name="attachments"
              onChange={handleInputChange}
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:font-medium"
            />
          </div>

          {/* Terms Agreement */}
          <div>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleInputChange}
                className="mt-1 text-blue-500 focus:ring-blue-300 rounded"
              />
              <span className="text-sm text-gray-700">
                I agree not to request illegal or unethical tasks.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Submit Task
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUploadModal