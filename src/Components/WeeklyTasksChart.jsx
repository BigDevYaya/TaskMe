// src/components/WeeklyTasksChart.jsx

import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const data = [
  { day: 'Mon', tasks: 2 },
  { day: 'Tue', tasks: 1 },
  { day: 'Wed', tasks: 3 },
  { day: 'Thu', tasks: 0 },
  { day: 'Fri', tasks: 4 },
  { day: 'Sat', tasks: 2 },
  { day: 'Sun', tasks: 1 },
]

const WeeklyTasksChart = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-bold mb-2 text-gray-700">📈 Tasks Completed (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#6366f1"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyTasksChart
