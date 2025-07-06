import React, { useEffect } from 'react'

const LoginActivityModal = ({setShowLoginActivity}) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setShowLoginActivity(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    })
  return (
    <div 
    className='fixed inset-0 flex items-center justify-center bg-black/50'
    onClick={() => setShowLoginActivity(false)}>
        <div
        onClick={(e) => e.stopPropagation()}>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4'>
                <h2 className='text-xl font-semibold mb-4'>Login Activity</h2>
                <p className='text-gray-700 mb-4'>Here you can view your recent login activity.</p>
                <ul className='space-y-2'>
                    <li className='flex justify-between items-center p-3 bg-gray-100 rounded-md'>
                        <span>Last Login: 2023-10-01 12:34:56</span>
                        <span className='text-sm text-gray-500'>IP: 123.456.789.012</span> 
                    </li>
                </ul>        
        </div>
    </div>
    </div>
  )
}

export default LoginActivityModal