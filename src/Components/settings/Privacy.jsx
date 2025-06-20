import React from 'react'
import Section from './Section'

const Privacy = () => {
  return (
    <Section
      title="Privacy & Security"
      subtitle="Enhance your privacy and security."
      badgeColor='bg-red-50'
      badgeTextColor="text-red-600"
    >
      <li className="flex justify-between items-center text-base p-3 rounded-md  transition duration-200 ease-in-out">
        <span className="text-gray-700">View Login Activity</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105">View</button>
      </li>
      <li className="flex justify-between items-center text-base p-3 rounded-md  transition duration-200 ease-in-out">
        <span className="text-gray-700">Set up 2FA</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105">Set up</button>
      </li>
      <li className="flex justify-between items-center text-base p-3 rounded-md  transition duration-200 ease-in-out">
        <span className="text-gray-700">Delete Account</span>
        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105">Delete</button>
      </li>
    </Section>
  )
}

export default Privacy