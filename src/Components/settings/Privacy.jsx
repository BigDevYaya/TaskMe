import React from 'react';
import { Smartphone, History } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Security & Privacy</h2>
        <p className="text-gray-500 text-sm">Manage your account security and sessions.</p>
      </div>

      <div className="divide-y divide-gray-100 border-t border-gray-100">
        {/* 2FA Row */}
        <div className="py-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
            <p className="text-xs text-gray-500">Security code required to log in.</p>
          </div>
          <button className="text-xs font-bold text-blue-600 hover:underline">Configure</button>
        </div>

        {/* Login Activity Row */}
        <div className="py-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-900">Active Sessions</p>
            <button className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1">
              <History size={12} /> Log out all
            </button>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <Smartphone size={14} className="text-gray-400" />
                <div className="text-xs">
                  <span className="font-bold text-gray-800">Chrome on MacOS</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-gray-500">Lagos, Nigeria</span>
                </div>
              </div>
              <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Online</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="py-6">
          <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">Danger Zone</p>
          <div className="flex items-center justify-between p-4 border border-red-100 rounded-lg bg-red-50/20">
            <div>
              <p className="text-sm font-bold text-gray-900">Delete Account</p>
              <p className="text-xs text-gray-500">This action is permanent and cannot be undone.</p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;