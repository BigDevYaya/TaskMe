import React from 'react'
import  useMessageStore  from '../stores/messageStore'
import { Search } from 'lucide-react'
import Tasks from '../Components/Tasks'
import Explore from '../Components/Explore'

const Exploretasks = () => {

  const { setMessage } = useMessageStore()

  document.addEventListener('DOMContentLoaded', () => {
    setMessage('Explore Tasks')
    console.log(setMessage)
  })
  
  return (
    <div className='p-6 min-h-screen bg-gray-50'>
      <Tasks />
    </div>
  )
}

export default Exploretasks