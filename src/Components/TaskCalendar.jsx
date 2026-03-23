import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
// DO NOT import 'react-calendar/dist/Calendar.css' — we style it ourselves
import { format } from 'date-fns'
import { useAuthStore } from '../Utils/useAuthStore'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../Utils/firebase'
import { CalendarDays } from 'lucide-react'

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
      snapshot.forEach(doc => {
        const data = doc.data()
        if (data.type === 'login' && data.timestamp?.seconds) {
          dateSet.add(format(new Date(data.timestamp.seconds * 1000), 'yyyy-MM-dd'))
        }
      })
      setLoginDates([...dateSet])
    }
    fetchLoginDates()
  }, [user])

  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return null
    const formatted = format(date, 'yyyy-MM-dd')
    const isToday = formatted === format(new Date(), 'yyyy-MM-dd')
    const isLogin = loginDates.includes(formatted)
    if (isToday) return 'cal-today'
    if (isLogin) return 'cal-active'
    return null
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={15} className="text-gray-400" />
        <h2 className="text-sm font-semibold text-gray-800">Task Activity</h2>
      </div>

      {/* Calendar */}
      <style>{`
        .react-calendar {
          width: 100%;
          border: none;
          background: transparent;
          font-family: inherit;
        }
        .react-calendar__navigation {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        .react-calendar__navigation__label {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          background: none;
          border: none;
          cursor: default;
          flex-grow: 1;
          text-align: left;
          padding: 0;
        }
        .react-calendar__navigation__arrow {
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          font-size: 14px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: background 0.15s;
          padding: 0;
        }
        .react-calendar__navigation__arrow:hover {
          background: #f3f4f6;
          color: #374151;
        }
        .react-calendar__navigation__prev2-button,
        .react-calendar__navigation__next2-button {
          display: none;
        }
        .react-calendar__month-view__weekdays {
          margin-bottom: 6px;
        }
        .react-calendar__month-view__weekdays__weekday {
          text-align: center;
          padding: 4px 0;
        }
        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #9ca3af;
          text-transform: uppercase;
        }
        .react-calendar__tile {
          background: none;
          border: none;
          border-radius: 8px;
          padding: 6px 0;
          font-size: 12px;
          color: #374151;
          cursor: pointer;
          transition: background 0.12s;
          text-align: center;
        }
        .react-calendar__tile:hover {
          background: #f1f5f9;
        }
        .react-calendar__tile--now {
          background: none !important;
        }
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #d1d5db !important;
        }
        .react-calendar__month-view__days__day--weekend {
          color: #374151;
        }
        .cal-today abbr {
          background: #3b6cf4;
          color: white;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-size: 12px;
        }
        .cal-active abbr {
          background: #e0e7ff;
          color: #4338ca;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-size: 12px;
        }
        .react-calendar__tile--active,
        .react-calendar__tile--active:enabled:hover {
          background: #f1f5f9 !important;
          color: #111827;
        }
      `}</style>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
      />
    </div>
  )
}

export default TaskCalendar