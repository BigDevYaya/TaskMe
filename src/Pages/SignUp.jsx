import React from 'react'
import SignUpComp from '../Components/SignUpComp'

const SignUp = () => {
  return (
    <div className='authbg relative'>
      <div className='w-50 h-50 bg-blue-600/15 top-52 left-1/2 rounded-full absolute'></div>
      <SignUpComp />
    </div>
  )
}

export default SignUp