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
    <div className='mx-4'>
      <Tasks />
    </div>
  )
}

export default Exploretasks