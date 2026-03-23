import { Formik } from 'formik';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { loginSchema } from '../Utils/schemas/schema';
import { useAuthStore } from '../Utils/useAuthStore';
import toast from 'react-hot-toast';
import { routes } from '../Utils/routes';

const LoginComp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Left panel */}
      <div className="hidden relative lg:block w-[60%] relative overflow-hidden">
        <img
          src="/loginimage.png" // replace with your image
          alt="Team"
          className="w-full h-full object-cover"
        />

        <div className='absolute inset-0 h-full w-full bg-linear-to-tl from-'>

        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 lg:w-[40%] bg-white flex flex-col justify-center px-12 py-10 overflow-y-auto">

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-9">
          <div className="w-10 h-10 bg-blue-500 rounded-[10px] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-[18px] font-bold text-gray-900 tracking-tight">TaskPerform</span>
        </div>

        <h1 className="text-[30px] font-bold text-gray-900 tracking-tight mb-7">Welcome Back</h1>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={async ({ email, password }) => {
            const res = await login(email, password);
            if (!res.success) {
              toast.error(res.error);
            } else {
              toast.success(`Welcome back ${res.user.displayName}`);
              navigate(routes.dashboard);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-0">

              {/* Email */}
              <div className="mb-[18px]">
                <label htmlFor="email" className="block text-[13.5px] font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className={`flex items-center gap-2.5 border-[1.5px] rounded-lg px-3.5 h-[46px] transition-colors ${
                  errors.email && touched.email ? 'border-red-400' : 'border-gray-200 focus-within:border-blue-500'
                }`}>
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-[6px]">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="text-[13.5px] font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/resetpassword" className="text-[13.5px] font-medium text-blue-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className={`flex items-center gap-2.5 border-[1.5px] rounded-lg px-3.5 h-[46px] transition-colors ${
                  errors.password && touched.password ? 'border-red-400' : 'border-gray-200 focus-within:border-blue-500'
                }`}>
                  <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500">
                    {showPassword ? <EyeOff className="w-[17px] h-[17px]" /> : <Eye className="w-[17px] h-[17px]" />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5 my-4">
                <input type="checkbox" id="remember" className="w-[15px] h-[15px] accent-blue-500 cursor-pointer" />
                <label htmlFor="remember" className="text-[13.5px] text-gray-500 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors mb-5"
              >
                {isLoading ? <div className="loader" /> : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3.5 mb-[18px]">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[11.5px] font-medium text-gray-400 uppercase tracking-[0.8px]">Or continue with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Social */}
              <div className="flex gap-3 mb-7">
                <button type="button" className="flex-1 h-11 border-[1.5px] border-gray-200 hover:border-gray-400 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2.5 text-[13.5px] font-medium text-gray-700 transition-colors">
                  <img src="https://www.google.com/favicon.ico" alt="" className="w-4 h-4" />
                  Google
                </button>
                <button type="button" className="flex-1 h-11 border-[1.5px] border-gray-200 hover:border-gray-400 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2.5 text-[13.5px] font-medium text-gray-700 transition-colors">
                  <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                    <svg className="w-2.5 h-3" viewBox="0 0 14 17" fill="white">
                      <path d="M13.3 13.1c-.3.6-.5 1-.8 1.5-.4.6-.8 1.2-1.4 1.2-.5 0-.9-.3-1.6-.3-.7 0-1.2.3-1.7.3-.6 0-1-.5-1.4-1.1-.4-.6-.8-1.4-1.1-2.2-.3-.9-.5-1.8-.5-2.7 0-1 .2-2 .7-2.8.4-.6 1-1.1 1.7-1.1.5 0 1 .3 1.5.3.5 0 1-.3 1.6-.3.7 0 1.3.4 1.7 1-.5.3-.9.9-.9 1.6 0 .7.4 1.4 1 1.7-.1.3-.2.6-.3.9zM9.6 2.2c-.5.6-1.3 1-2 1 0-.1 0-.2 0-.3 0-.6.3-1.3.7-1.8.5-.5 1.2-.9 1.9-1 0 .1 0 .2 0 .4 0 .6-.2 1.2-.6 1.7z"/>
                    </svg>
                  </div>
                  Apple
                </button>
              </div>

              {/* Sign up */}
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 font-semibold hover:underline">Sign Up</Link>
              </p>

            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginComp;