import React from 'react'

const Section = ({ title, subtitle, children, badgeColor = 'bg-blue-50', badgeTextColor = 'text-blue-900' }) => {
  return (
    <section className="w-full rounded-lg border border-gray-200 p-6 mb-6 bg-white ">
    <div className={`inline-block px-7 py-2 mb-4 rounded-lg ${badgeColor}`}>
      <h2 className={`font-bold text-xl ${badgeTextColor}`}>{title}</h2>
      <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
    </div>
    <ul className="space-y-4">{children}</ul>
  </section>
  )
}

export default Section