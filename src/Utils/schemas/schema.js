import * as Yup from 'yup'

export const loginSchema = Yup.object({
    email : Yup.string()
    .email('Invalid Email Address')
    .required('Email is required'),
    password : Yup.string()
    .required('Password is required')
})


export const signupSchema = Yup.object().shape({
  uname: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be less than 20 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});