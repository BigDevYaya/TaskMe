import React from 'react'
import Section from './Section'

const ProAcc = ({setShowPasswordModal, setShowEmailModal}) => {
  return (
    <Section title="Profile & Account" subtitle="Manage your profile and account settings.">
      <li className="flex justify-between items-center text-base p-3 rounded-md  transition duration-200 ease-in-out">
        <span className="text-gray-700">Change Password</span>
        <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
        onClick={() => setShowPasswordModal(true)}>Change</button>
      </li>
      <li className="flex justify-between items-center text-base p-3 rounded-md  transition duration-200 ease-in-out">
        <span className="text-gray-700">Update Email</span>
        <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
        onClick={() => setShowEmailModal(true)}>Update</button>
      </li>
      <li className="flex justify-between items-center text-base p-3 rounded-md  transition duration-200 ease-in-out">
        <span className="text-gray-700">Manage Notifications</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105">Notifications</button>
      </li>
    </Section>
  )
}

export default ProAcc