import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Formik } from "formik";
import { routes } from "../Utils/routes";
import { signupSchema } from "../Utils/schemas/schema";
import { useAuthStore } from "../Utils/useAuthStore";
import toast from "react-hot-toast";

const SignUpComp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Left panel */}
      <div className="hidden lg:block w-[60%] relative overflow-hidden">
        <img
          src="/loginimage.png"
          alt="Team"
          className="w-full h-full object-cover brightness-[0.45]"
        />
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

        <h1 className="text-[30px] font-bold text-gray-900 tracking-tight mb-1">Create an account</h1>
        <p className="text-sm text-gray-400 mb-7">Join TaskPerform and get started today.</p>

        <Formik
          initialValues={{ uname: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={signupSchema}
          onSubmit={async (values, actions) => {
            const res = await register(values.uname, values.email, values.password);
            if (!res.success) {
              toast.error(res.error);
            } else {
              toast.success(`Welcome on board, ${res.user.displayName}`);
              actions.resetForm();
              navigate(routes.dashboard);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex flex-col">

              {/* Full Name */}
              <div className="mb-[18px]">
                <label htmlFor="uname" className="block text-[13.5px] font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className={`flex items-center gap-2.5 border-[1.5px] rounded-lg px-3.5 h-[46px] transition-colors ${
                  errors.uname && touched.uname ? "border-red-400" : "border-gray-200 focus-within:border-blue-500"
                }`}>
                  <User className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    id="uname"
                    name="uname"
                    placeholder="Kujukwu Marble"
                    className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                    value={values.uname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.uname && touched.uname && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.uname}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-[18px]">
                <label htmlFor="email" className="block text-[13.5px] font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className={`flex items-center gap-2.5 border-[1.5px] rounded-lg px-3.5 h-[46px] transition-colors ${
                  errors.email && touched.email ? "border-red-400" : "border-gray-200 focus-within:border-blue-500"
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

              {/* Password row */}
              <div className="flex flex-col  gap-4 mb-5">

                {/* Password */}
                <div className="flex-1">
                  <label htmlFor="password" className="block text-[13.5px] font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className={`flex items-center gap-2.5 border-[1.5px] rounded-lg px-3.5 h-[46px] transition-colors ${
                    errors.password && touched.password ? "border-red-400" : "border-gray-200 focus-within:border-blue-500"
                  }`}>
                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
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

                {/* Confirm Password */}
                <div className="flex-1">
                  <label htmlFor="confirmPassword" className="block text-[13.5px] font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className={`flex items-center gap-2.5 border-[1.5px] rounded-lg px-3.5 h-[46px] transition-colors ${
                    errors.confirmPassword && touched.confirmPassword ? "border-red-400" : "border-gray-200 focus-within:border-blue-500"
                  }`}>
                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-500">
                      {showConfirm ? <EyeOff className="w-[17px] h-[17px]" /> : <Eye className="w-[17px] h-[17px]" />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword}</p>
                  )}
                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors mb-5"
              >
                {isLoading ? <div className="loader" /> : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
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

              {/* Login link */}
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/" className="text-blue-500 font-semibold hover:underline">Log In</Link>
              </p>

            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpComp;