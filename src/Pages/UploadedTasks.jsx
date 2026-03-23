import React, { useEffect, useState } from 'react'
import { CalendarDays, Trash2, Pencil, Plus, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { useAuthStore } from '../Utils/useAuthStore'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../Utils/firebase'
import { Link } from 'react-router'
// import TaskUploadModal from './uploadtask/TaskUploadModal'
import TaskUploadModal from '../Components/uploadtask/TaskUploadModal'

const categoryStyles = {
  'App/Website Engagement': { bg: 'bg-blue-50', text: 'text-blue-600' },
  'Creative Tasks':         { bg: 'bg-violet-50', text: 'text-violet-600' },
  'Social Media':           { bg: 'bg-pink-50', text: 'text-pink-600' },
  'Surveys & Feedback':     { bg: 'bg-amber-50', text: 'text-amber-600' },
}

const CATEGORIES = ['All', 'App/Website Engagement', 'Creative Tasks', 'Social Media', 'Surveys & Feedback']
const VISIBILITY  = ['All', 'Public', 'Private']
const STATUS      = ['All', 'Active', 'Completed']

const getCategoryStyle = (category) =>
  categoryStyles[category] || { bg: 'bg-gray-100', text: 'text-gray-500' }

// Reusable select pill
const FilterSelect = ({ label, value, options, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="appearance-none h-8 pl-3 pr-7 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 focus:outline-none focus:border-blue-400 transition-colors"
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt === 'All' ? label : opt}</option>
      ))}
    </select>
    <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
)

const UploadedTasks = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthStore()
  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false)

  // Filter + sort state
  const [category, setCategory]   = useState('All')
  const [visibility, setVisibility] = useState('All')
  const [status, setStatus]        = useState('All')
  const [priceMin, setPriceMin]    = useState('')
  const [priceMax, setPriceMax]    = useState('')
  const [sort, setSort]            = useState('newest')
  const [showPriceRange, setShowPriceRange] = useState(false)

  useEffect(() => {
    if (!user?.uid) return
    setIsLoading(true)
    const q = query(collection(db, 'tasks'), where('uploadedBy', '==', user.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setIsLoading(false)
    }, (error) => {
      console.error('Failed to fetch uploaded tasks:', error)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [user?.uid])

  // Derived: filtered + sorted
  const processed = tasks
    .filter(task => {
      if (category !== 'All' && task.category !== category) return false
      if (visibility !== 'All' && task.visibility !== visibility) return false
      if (status !== 'All') {
        const isCompleted = task.completedBy?.length > 0
        if (status === 'Completed' && !isCompleted) return false
        if (status === 'Active' && isCompleted) return false
      }
      if (priceMin !== '' && Number(task.commissionPrice) < Number(priceMin)) return false
      if (priceMax !== '' && Number(task.commissionPrice) > Number(priceMax)) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'newest') return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      if (sort === 'price-desc') return Number(b.commissionPrice) - Number(a.commissionPrice)
      if (sort === 'price-asc')  return Number(a.commissionPrice) - Number(b.commissionPrice)
      return 0
    })

  const activeFilterCount = [
    category !== 'All',
    visibility !== 'All',
    status !== 'All',
    priceMin !== '' || priceMax !== '',
  ].filter(Boolean).length

  return (
    <div className="p-6 min-h-screen" style={{ background: '#eef0f6' }}>

     

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">

        {/* Filter icon + count badge */}
        <div className="flex items-center gap-1.5 mr-1">
          <SlidersHorizontal size={14} className="text-gray-400" />
          {activeFilterCount > 0 && (
            <span className="text-[10px] font-bold bg-blue-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        {/* Filters */}
        <FilterSelect label="Category"   value={category}   options={CATEGORIES} onChange={setCategory} />
        <FilterSelect label="Visibility" value={visibility} options={VISIBILITY}  onChange={setVisibility} />
        <FilterSelect label="Status"     value={status}     options={STATUS}      onChange={setStatus} />

        {/* Price range toggle */}
        <button
          onClick={() => setShowPriceRange(p => !p)}
          className={`h-8 px-3 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
            priceMin !== '' || priceMax !== ''
              ? 'bg-blue-50 border-blue-300 text-blue-600'
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          Price range
          <ChevronDown size={11} className={`transition-transform ${showPriceRange ? 'rotate-180' : ''}`} />
        </button>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="appearance-none h-8 pl-3 pr-7 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 focus:outline-none focus:border-blue-400 transition-colors"
          >
            <option value="newest">Newest first</option>
            <option value="price-desc">Price: high to low</option>
            <option value="price-asc">Price: low to high</option>
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Reset — only shows when filters are active */}
        {activeFilterCount > 0 && (
          <button
            onClick={() => { setCategory('All'); setVisibility('All'); setStatus('All'); setPriceMin(''); setPriceMax('') }}
            className="h-8 px-3 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            Reset
          </button>
        )}

        {/* Add Task CTA */}
        <button
          onClick={() => setShowModal(true)}
          className="h-8 px-3.5 flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <Plus size={13} />
          Add Task
        </button>
      </div>

      {/* Price range inputs — collapsible */}
      {showPriceRange && (
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs text-gray-400 font-medium">₦</span>
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            className="w-24 h-8 px-3 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-400 text-gray-700 placeholder-gray-300"
          />
          <span className="text-xs text-gray-300">—</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            className="w-24 h-8 px-3 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-400 text-gray-700 placeholder-gray-300"
          />
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="loader" />
        </div>
      ) : processed.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-2">
          <p className="text-sm text-gray-400">
            {tasks.length === 0 ? "You haven't uploaded any tasks yet." : "No tasks match your filters."}
          </p>
          {tasks.length > 0 && activeFilterCount > 0 && (
            <button
              onClick={() => { setCategory('All'); setVisibility('All'); setStatus('All'); setPriceMin(''); setPriceMax('') }}
              className="text-xs text-blue-500 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processed.map(task => {
            const { bg, text } = getCategoryStyle(task.category)
            const dateLabel = task.deadline ||
              (task.createdAt?.seconds
                ? new Date(task.createdAt.seconds * 1000).toLocaleDateString()
                : '—')

            return (
              <div
                key={task.id}
                className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-200 transition-all duration-150"
              >
                {/* Top row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={`text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md ${bg} ${text}`}>
                    {task.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <CalendarDays size={11} />
                    <span className="text-[11px]">{dateLabel}</span>
                  </div>
                </div>

                {/* Title + description */}
                <Link to={`/uploadedtasks/${task.id}`} className="flex-1 group">
                  <h2 className="text-sm font-semibold text-gray-900 group-hover:text-blue-500 transition-colors leading-snug">
                    {task.title}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">
                    {task.description}
                  </p>
                </Link>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    ₦{task.commissionPrice}
                  </span>
                  <div className="flex items-center gap-3">
                    <button className="text-gray-300 hover:text-blue-500 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button className="text-gray-300 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <TaskUploadModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default UploadedTasks