import React, { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { useAuthStore } from '../Utils/useAuthStore';
import TaskUploadModal from './uploadtask/TaskUploadModal';
import SearchFilter from './SearchFilter';

const Explore = ({ className }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthStore()

  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 mb-4">
      {/* Search bar */}

      {/* Right section: Button and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
        <button
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-100 ease-in-out transform hover:scale-105 focus:outline-none ${className ? className : 'hidden'} items-center gap-2`}
          onClick={() => setShowModal(!showModal)}
        >
          <Plus className="" /> Upload Task
        </button>

        <div>
          <SearchFilter />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <TaskUploadModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Explore;
