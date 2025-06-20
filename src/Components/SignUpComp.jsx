import { useState } from "react"
import { Link } from "react-router" 
import { EyeClosed, Eye } from "lucide-react"


const SignUpComp = () => {
    const [showPassword, setShowPassword] = useState(false)

    function handleIconClick() {
        setShowPassword(!showPassword)
    }
  return (
    <div className='flex items-center justify-center h-svh'>
        <div className='bg-white backdrop-blur-2xl shadow-2xl rounded-md p-7'>
            <div className='mb-5 border-b pb-2'>
              <h1 className='text-2xl font-semibold'>Sign Up</h1>
            </div>
            <form action="" className='flex flex-col items-start gap-6'>
                <fieldset className="w-full">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className='focus:outline-none border border-blue-400 px-5 py-3 rounded-xl w-full' placeholder="Kujukwu Marble" />
                </fieldset>
                <fieldset className='flex flex-col items-start w-full gap-2'>
                    <label htmlFor="email" className='text-lg'>Enter Email</label>
                    <input type="email" name="email" id="email" className='focus:outline-none border border-blue-400 px-5 py-3 rounded-xl w-full' placeholder='example@gmail.com' />
                </fieldset>
                <div className="flex gap-4 items-center">
                    <fieldset className='w-full flex flex-col items-start gap-2'>
                  <label htmlFor="password" className='text-lg'>Enter Password</label>
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
                <fieldset className='w-full flex flex-col items-start gap-2'>
                  <label htmlFor="password" className='text-lg'>Confirm Password</label>
                  <div className='border border-blue-400 px-5 py-3 flex items-center gap-4 rounded-xl w-full'>
                  <input type={
                    showPassword ? 'text' : 'password'
                  }
                  name="password" 
                  id="password"
                  placeholder='*********'
                  className='flex-1 focus:outline-none' />
                  </div>
                </fieldset>
                </div>
                <input type="button" value="Sign Up" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform self-center w-full mb-2" />
            </form>

            <div className='h-0.5 bg-gray-400 my-3 w-full'></div>
            <div className='flex items-center gap-2'>
              <h2>Have an account?</h2> 
              <Link className='underline' to={'/login'}>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUpComp