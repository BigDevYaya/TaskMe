import React from 'react'
import Section from './Section'

const Theme = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Appearance</h2>
        <p className="text-sm text-slate-500">Customize how the app looks on your device.</p>
      </div>

      <div className=" rounded-2xl border border-slate-200  divide-y divide-slate-100">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Interface Theme</p>
            <p className="text-xs text-slate-500">Select or customize your UI theme.</p>
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option>Light Mode</option>
            <option>Dark Mode</option>
            <option>System Default</option>
          </select>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Language</p>
            <p className="text-xs text-slate-500">Choose your preferred language.</p>
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Theme