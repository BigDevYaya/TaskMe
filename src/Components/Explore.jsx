import React, { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import TaskUploadModal from './uploadtask/TaskUploadModal';


const Explore = ({className = 'hidden'}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='flex w-full justify-between items-center mb-4'>
        <div className='flex items-center border border-blue-100 px-6 py-3 rounded-2xl w-[500px]'>
        <input type="text"
        className='focus:outline-none flex-1' />
        <Search className='text-blue-400'/>
        </div>
        <div className={`flex items-center gap-4`}>
          <button className={`bg-blue-600  ${className} hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-100 ease-in-out transform hover:scale-105 focus:outline-none items-center gap-2`} onClick={() => {
            setShowModal(!showModal),
            console.log(showModal)
          }}><Plus className=''/> Upload Task</button>
        <div className='border gap-4 border-blue-100 px-6 py-3 rounded-2xl bg-blue-50'>
            <label htmlFor="Filter" className='text-sm text-gray-500'>Filter by</label>
         <select name="Filter" id="" className='focus:outline-none bg-transparent w-full'>
          <option value="category">Category</option>
          <option value="price">Price</option>
          <option value="complexity">Complexity</option>
            </select>
        </div>
        </div>
        {showModal && <TaskUploadModal isOpen={showModal} onClose={() => setShowModal(false)} />}
      </div>
  )
}

export default Explore