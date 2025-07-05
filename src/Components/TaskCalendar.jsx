import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'
import { useAuthStore } from '../Utils/useAuthStore'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../Utils/firebase'

const completedDates = ['2025-06-15', '2025-06-16', '2025-06-17']

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [loginDates, setLoginDates] = useState([])

  const { user } = useAuthStore()

  useEffect(() => {
    const fetchLoginDates = async () => {
      if (!user?.uid) return

      const logRef = collection(db, 'users', user.uid, 'activityLogs')
      const snapshot = await getDocs(logRef)

      const dateSet = new Set()

      snapshot.forEach((doc) => {
        const data = doc.data()
        if (data.type === 'login' && data.timestamp?.seconds) {
          const dateStr = format(new Date(data.timestamp.seconds * 1000), 'yyyy-MM-dd')
          dateSet.add(dateStr)
        }
      })

      setLoginDates([...dateSet])
    }

    fetchLoginDates()
  }, [user])

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formatted = format(date, 'yyyy-MM-dd')
      if (loginDates.includes(formatted)) {
        return 'highlighted-day'
      }
    }
    return null
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        📆 Task Activity
      </h2>

      <div className="custom-calendar rounded-xl overflow-hidden">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
          className="w-full"
        />
      </div>

      <p className="mt-4 text-sm text-center text-gray-600 bg-gray-100 py-2 px-4 rounded-lg">
        📅 <span className="font-medium text-gray-800">{format(selectedDate, 'PPP')}</span>
      </p>
    </div>
  )
}

export default TaskCalendar
