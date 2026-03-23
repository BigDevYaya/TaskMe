import React from 'react'
import TaskContainer from './TaskContainer'

const Tasks = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
      <TaskContainer />
    </div>
  )
}

export default Tasks