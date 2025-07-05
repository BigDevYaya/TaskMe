import { Formik } from 'formik';
import { useEffect } from 'react'
import { changePasswordSchema } from '../../../Utils/schemas/schema';
import { useAuthStore } from '../../../Utils/useAuthStore';
import toast from 'react-hot-toast';

const ChangePasswordModal = ({setShowPasswordModal}) => {

    const { changePassword, isLoading } = useAuthStore()
    useEffect(() => {
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    setShowPasswordModal(false);
                }
            };
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        })
  return (
    <div 
    className='fixed inset-0 flex items-center justify-center shadow-lg bg-black/50'
    onClick={() => setShowPasswordModal(false)}>
        <div 
        className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'
        onClick={(e) => e.stopPropagation()}>
            <h2 className='text-xl font-semibold mb-4'>Change Your Password</h2>
            <Formik
            initialValues={{
                password: '',
                newPassword: ''
            }}
            validationSchema={changePasswordSchema}
            onSubmit={async (values, actions) => {
                const result = await changePassword(values.password, values.newPassword);
                if(result.success) {
                    toast.success(result.message);
                    actions.resetForm();
                    setShowPasswordModal(false);
                } else {
                    toast.error(result.message);
                }
            }}
            >
                {
                    props => (
                        <form 
                        className='mt-4 flex flex-col gap-4'
                        onSubmit={props.handleSubmit}>
                            <div className='mb-4'>
                                <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Current Password</label>
                                <input type="password" 
                                value={props.values.password}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                id="password" className='mt-1 block w-full rounded-md focus:ring-blue-500 focus:border focus:border-blue-500 px-2 py-4 focus:outline-none' placeholder='Enter your current password' />
                                {
                                    props.errors.password && props.touched.password && <div className='text-sm text-red-300'>{ props.errors.password }</div>
                                }
                            </div>
                            <div className='mb-4'>
                                <label 
                                htmlFor="newPassword" className='block text-sm font-medium text-gray-700'>New Password</label>
                                <input 
                                value={props.values.newPassword}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                type="password" 
                                id="newPassword" className='mt-1 block w-full rounded-md focus:ring-blue-500 focus:border focus:border-blue-500 px-2 py-4 focus:outline-none' placeholder='Enter your new password' />
                                {
                                    props.errors.newPassword && props.touched.newPassword && <div className='text-sm text-red-300'>{ props.errors.newPassword }</div>
                                }
                            </div>
                            <button 
                            type="submit" 
                            disabled={isLoading}
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out'>{
                                isLoading ? 'Changing Password...' : 'Change Password'
                            }</button>
                        </form>
                    )
                }
            </Formik>
        </div>
    </div>
  )
}

export default ChangePasswordModal