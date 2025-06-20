import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react'
import { Link } from 'react-router';

const LoginComp = () => {
  const [showPassword, setShowPassword] = useState(false);

  function handleIconClick() {
    setShowPassword(!showPassword)
  }
  return (
    <div>
        <div>
            <h1>Log in</h1>
            <p>We've missed you</p>
            <form action="">
                <fieldset className='flex flex-col'>
                    <label htmlFor="email">Enter Email</label>
                    <input type="email" name="email" id="email" className='focus:outline-none border border-blue-400 px-5 py-3 rounded-xl' placeholder='example@gmail.com' />
                </fieldset>
                <fieldset>
                  <label htmlFor="password">Input Password</label>
                  <div className='border border-blue-400 px-5 py-3 flex items-center gap-4 rounded-xl'>
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
                <input type="button" value="Login" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform" />
            </form>

            <Link>Forgot Password?</Link>
            <div className='h-0.5 w-50 bg-gray-400'></div>
            <div className='flex items-center'>
              <h2>Don't Have an account?</h2> 
              <Link className=''>Create an account</Link>
            </div>
        </div>
    </div>
  )
}

export default LoginComp