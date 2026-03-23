import React from 'react';

const ProAcc = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Account Settings</h2>
        <p className="text-slate-500 text-sm">Update your personal information and security credentials.</p>
      </div>

      <div className="grid gap-8">
        <div className="grid gap-3">
          <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
          <input 
            type="email" 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            placeholder="name@company.com"
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-bold text-slate-700 ml-1">Current Password</label>
          <input 
            type="password" 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            placeholder="••••••••"
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-bold text-slate-700 ml-1">New Password</label>
          <input 
            type="password" 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
        <button className="px-6 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all">
          Cancel
        </button>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all active:scale-95">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProAcc;