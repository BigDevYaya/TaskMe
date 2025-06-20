import { useState } from "react"
import { Link } from "react-router" 
import { EyeClosed, Eye } from "lucide-react"
import { Formik } from "formik"
import { signupSchema } from "../Utils/schemas/schema"


const SignUpComp = () => {
    const [showPassword, setShowPassword] = useState(false)

    function handleIconClick() {
        setShowPassword(!showPassword)
    }
  return (
    <div className='flex items-center justify-center h-svh'>
        <div className='bg-white/80 backdrop-blur-3xl shadow-2xl rounded-md p-7'>
            <div className='mb-5 border-b pb-2'>
              <h1 className='text-2xl font-semibold'>Sign Up</h1>
            </div>
            <Formik
            initialValues={{
              uname : '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={signupSchema}>
              {
                props => (
                  <form action="" className='flex flex-col items-start gap-6' onSubmit={props.handleSubmit}>
                <fieldset className="w-full">
                    <label htmlFor="uname">Name</label>
                    <input 
                    type="text" 
                    name="uname" 
                    id="uname" 
                    className='focus:outline-none border border-blue-400 px-5 py-3 rounded-xl w-full' placeholder="Kujukwu Marble"
                    value={props.values.uname} 
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}/>
                    { props.errors.uname && props.touched.uname && <div id="feedback" className="text-red-600 text-sm">{props.errors.uname}</div> }
                </fieldset>
                <fieldset className='flex flex-col items-start w-full gap-2'>
                    <label htmlFor="email" className='text-lg'>Enter Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className='focus:outline-none border border-blue-400 px-5 py-3 rounded-xl w-full' placeholder='example@gmail.com'
                    value={props.values.email}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange} />
                    { props.errors.email && props.touched.email && <div id="feedback" className="text-red-600 text-sm">{props.errors.email}</div> }
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
                  className='flex-1 focus:outline-none'
                  value={props.values.password}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange} />
                  {
                    showPassword ? <Eye onClick={handleIconClick} /> : <EyeClosed onClick={handleIconClick} />
                  }
                  </div>
                  { props.errors.password && props.touched.password && <div id="feedback" className="text-red-600 text-sm">{props.errors.password}</div> }
                </fieldset>
                <fieldset className='w-full flex flex-col items-start gap-2'>
                  <label htmlFor="confirmPassword" className='text-lg'>Confirm Password</label>
                  <div className='border border-blue-400 px-5 py-3 flex items-center gap-4 rounded-xl w-full'>
                  <input type={
                    showPassword ? 'text' : 'password'
                  }
                  name="confirmPassword" 
                  id="confirmPassword"
                  placeholder='*********'
                  className='flex-1 focus:outline-none'
                  value={props.values.confirmPassword}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange} />
                  </div>
                  { props.errors.confirmPassword && props.touched.uname && <div id="feedback" className="text-red-600 text-sm">{props.errors.uname}</div> }
                </fieldset>
                </div>
                <input type="submit" value="Sign Up" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition duration-200 ease-in-out transform self-center w-full mb-2" />
            </form>
                )
              }
            </Formik>
            

            <div className='h-0.5 bg-gray-400 my-3 w-full'></div>
            <div className='flex items-center gap-2'>
              <h2>Have an account?</h2> 
              <Link className='underline' to={'/'}>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUpComp