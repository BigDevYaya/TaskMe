import React from 'react'
import Section from './Section'

const Theme = () => {
  return (
    <Section title="Theme & App Settings" subtitle="Your preference is all that matters.">
      <li className="flex justify-between items-center text-base p-3 rounded-md  transition duration-200 ease-in-out">
        <span className="text-gray-700">Change Theme</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105">Change</button>
      </li>
      <li className="flex justify-between items-center text-base p-3 rounded-md  transition duration-200 ease-in-out">
        <span className="text-gray-700">Change Language</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105">Select</button>
      </li>
    </Section>
  )
}

export default Theme