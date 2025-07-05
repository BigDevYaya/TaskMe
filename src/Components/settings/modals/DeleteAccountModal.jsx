import React, { useEffect } from 'react'
import { useAuthStore } from '../../../Utils/useAuthStore';
import { Formik } from 'formik';
import { deleteAccountSchema } from '../../../Utils/schemas/schema';
import toast from 'react-hot-toast';

const DeleteAccountModal = ({ setShowDeleteAccountModal }) => {
    const { isLoading, deleteAccount } = useAuthStore()
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setShowDeleteAccountModal(false);
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
    onClick={() => setShowDeleteAccountModal(false)}>
        <div 
        className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'
        onClick={(e) => e.stopPropagation()}>
            <h2 className='text-xl font-semibold mb-4'>Delete Your Account</h2>
            <p className='text-gray-700 mb-4'>Are you sure you want to delete your account? This action cannot be undone.</p>
            <Formik
                initialValues={{ password: '' }}
                validationSchema={deleteAccountSchema}
                onSubmit={async (values, actions) => {
                    const result = await deleteAccount(values.password);
                    if (result.success) {
                        toast.success(result.message);
                        actions.resetForm();
                        setShowDeleteAccountModal(false);
                    } else {
                        actions.setFieldError('password', result.message);
                    }
                }}>
                {
                    props => (
                        <form 
                        className='flex flex-col gap-4'
                        onSubmit={props.handleSubmit}>
                            <div>
                                <label htmlFor="password" className='block text-sm font-medium text-gray-700'> Input password</label>
                                <input 
                                type="password" 
                                id="password" 
                                value={props.values.password}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                className='mt-1 block w-full rounded-md focus:ring-blue-500 focus:border-blue-500 px-2 py-2 focus:outline-none' placeholder='Enter Password' />
                                {
                                    props.touched.password && props.errors.password && (
                                        <div className='text-red-500 text-sm mt-1'>{props.errors.password}</div>
                                    )
                                }
                            </div>
                            <button type="submit"
                            disabled={isLoading} 
                            className='w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/40 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out'>{
                                isLoading ? 'Deleting...' : 'Delete Account'
                            }</button>
                        </form>
                    )
                }
            </Formik>
        </div>
    </div>
  )
}

export default DeleteAccountModal