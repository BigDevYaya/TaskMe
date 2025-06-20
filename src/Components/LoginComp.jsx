import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react'
import { Link } from 'react-router';

const LoginComp = () => {
  const [showPassword, setShowPassword] = useState(false);

  function handleIconClick() {
    setShowPassword(!showPassword)
  }
  return (
    <div className='flex items-center justify-center h-svh'>
        <div className='bg-white backdrop-blur-2xl shadow-2xl rounded-md p-7'>
            <div className='mb-5 border-b pb-2'>
              <h1 className='text-2xl font-semibold'>Log in</h1>
            </div>
            <form action="" className='flex flex-col items-start gap-6'>
                <fieldset className='flex flex-col items-start w-full gap-2'>
                    <label htmlFor="email" className='text-lg'>Enter Email</label>
                    <input type="email" name="email" id="email" className='focus:outline-none border border-blue-400 px-5 py-3 rounded-xl w-full' placeholder='example@gmail.com' />
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
                  className='flex-1 focus:outline-none' />
                  {
                    showPassword ? <Eye onClick={handleIconClick} /> : <EyeClosed onClick={handleIconClick} />
                  }
                  </div>
                </fieldset>
                <input type="button" value="Login" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform self-center w-full mb-2" />
            </form>

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