import { Formik } from 'formik';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { loginSchema } from '../Utils/schemas/schema';
import { useAuthStore } from '../Utils/useAuthStore';
import toast from 'react-hot-toast';
import { routes } from '../Utils/routes';

const LoginComp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore();

  function handleIconClick() {
    setShowPassword(!showPassword)
  }
  return (
    <div className='flex items-center justify-center h-svh'>
        <div className='bg-white/80 backdrop-blur-3xl shadow-2xl rounded-md p-7'>
            <div className='mb-5 border-b pb-2'>
              <h1 className='text-2xl font-semibold'>Log in</h1>
            </div>
            <Formik
            initialValues={{
              email : '',
              password: ''
            }}
            validationSchema={loginSchema}
            onSubmit={ async ({email, password}) => {
              const res = await login(email, password)
              if(!res.success){
                toast.error(res.error)
              } else {
                toast.success(`Welcome back ${res.user.displayName}`),
                navigate(routes.dashboard)
              }
            }}>
            {
              props => (
                <form action="" className='flex flex-col items-start gap-6' onSubmit={props.handleSubmit}>
                <fieldset className='flex flex-col items-start w-full gap-2'>
                    <label htmlFor="email" className='text-lg'>Enter Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className='focus:outline-none border border-blue-400 px-5 py-3 rounded-xl w-full' 
                    value={props.values.email}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur} 
                    placeholder='example@gmail.com' />
                    {props.errors.email && props.touched.email && <div id='feedback' className='text-red-600 text-sm'>{props.errors.email}</div>}
                </fieldset>
                <fieldset className='w-full flex flex-col items-start gap-2'>
                  <label htmlFor="password" className='text-lg'>Input Password</label>
                  <div className='border border-blue-400 px-5 py-3 flex items-center gap-4 rounded-xl w-full'>
                  <input type={
                    showPassword ? 'text' : 'password'
                  }
                  name="password" 
                  id="password"
                  placeholder='*********'
                  className='flex-1 focus:outline-none'
                  value={props.values.password}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange} />
                  {
                    showPassword ? <Eye onClick={handleIconClick} /> : <EyeClosed onClick={handleIconClick} />
                  }
                  </div>
                  { props.errors.password && props.touched.password && <div id='feedback' className='text-red-500 text-sm'>{props.errors.password}</div> }
                </fieldset>
                <button
                type='submit'
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform self-center w-full mb-2 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:bg-gray-400 flex items-center justify-center"
                >
                  {
                    isLoading ? <div className='loader'></div> : 'Login'
                  }
                </button>
            </form>
              )
            }
            </Formik>
            <Link>Forgot Password?</Link>
            <div className='h-0.5 bg-gray-400 my-3 w-full'></div>
            <div className='flex items-center gap-2'>
              <h2>Don't have an account?</h2> 
              <Link className='underline' to={'/signup'}>Create an account</Link>
            </div>
        </div>
    </div>
  )
}

export default LoginComp