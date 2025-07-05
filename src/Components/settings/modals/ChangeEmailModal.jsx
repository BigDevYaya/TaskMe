import { Formik } from 'formik';
import React, { useEffect } from 'react'
import { changeEmailSchema } from '../../../Utils/schemas/schema';
import { useAuthStore } from '../../../Utils/useAuthStore';
import toast from 'react-hot-toast';

const ChangeEmailModal = ({setShowEmailModal}) => {
    const { changeEmail } = useAuthStore();
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setShowEmailModal(false);
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
    onClick={() => setShowEmailModal(false)}>
        <div 
        className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'
        onClick={(e) => e.stopPropagation()}>
            <h2 className='text-xl font-semibold mb-4'>Change Your Email</h2>
            <Formik
            initialValues={{
                email: '',
                newEmail: '',
                password: '',
            }}
            validationSchema={changeEmailSchema}
            onSubmit={async (values, actions) => {
                const result = await changeEmail(values.email, values.newEmail, values.password);
                if(result.success) {
                    toast.success(result.message);
                    actions.resetForm();
                    setShowEmailModal(false);
                } else {
                    actions.setFieldError('email', result.message);
                }
            }}
            >
                {
                    props => (
                        <form 
                        className='flex flex-col gap-4'
                        onSubmit={props.handleSubmit}
                        >
                            <div>
                                <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Current Email</label>
                                <input
                                type="email" 
                                value={props.values.email}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                id="email" 
                                className='mt-1 block w-full rounded-md focus:ring-blue-500 focus:border-blue-500 px-2 py-2 focus:outline-none' placeholder='Enter your current email' />
                                {
                                    props.errors.email && props.touched.email && <div className='text-sm text-red-300'>{ props.errors.email }</div>
                                }
                            </div>
                            <div>
                                <label 
                                htmlFor="newEmail" className='block text-sm font-medium text-gray-700'>New Email</label>
                                <input 
                                type="email"
                                value={props.values.newEmail}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur} 
                                id="newEmail" 
                                className='mt-1 block w-full rounded-md focus:ring-blue-500 focus:border-blue-500 px-2 py-2 focus:outline-none' placeholder='Enter your new email' />
                                {
                                    props.errors.newEmail && props.touched.newEmail && <div className='text-sm text-red-300'>{ props.errors.newEmail }</div>
                                }
                            </div>
                            <div>
                                <label 
                                htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                                <input 
                                type="password"
                                value={props.values.password}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur} 
                                id="password" 
                                className='mt-1 block w-full rounded-md focus:ring-blue-500 focus:border-blue-500 px-2 py-2 focus:outline-none' placeholder='Enter Password' />
                                {
                                    props.errors.password && props.touched.password && <div className='text-sm text-red-300'>{ props.errors.password }</div>
                                }
                            </div>
                            <button 
                            type="submit" 
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out'>Change Email</button>
                        </form>
                    )
                }
            </Formik>
        </div>
    </div>
  )
}

export default ChangeEmailModal