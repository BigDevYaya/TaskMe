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




export const uploadSchema = Yup.object().shape({
  taskName: Yup.string()
    .min(5, "Name shouldn't be too short")
    .required('Task Name is Compulsory'),
  taskDescription: Yup.string()
    .min(10, "Description should be well explanatory")
    .required('Please input the description of the task'),
  taskInstructions: Yup.string()
    .required('Please input the Task instructions'),
  numberOfPeople: Yup.number()
    .typeError('Only numbers are allowed here')
    .required('For the task to be completed we need the number of people required'),
  proofsNeeded: Yup.string()
    .required('What are the proofs needed before completing the task'),
  complexity: Yup.string()
    .oneOf(['Simple', 'Mid', 'Hard'], 'Select a valid complexity')
    .required('Complexity is required'),
  category: Yup.string()
    .oneOf(['Social Media', 'Surveys and Feedback', 'App/Website Engagement', 'Creative Tasks', 'Other'])
    .required('Category is required'),
  commissionPrice: Yup.number()
    .required('Please input the price for completion of the task')
    .typeError('Price can only be a number'),
  externalLink: Yup.string()
    .optional()
    .typeError('Links are letters and not numbers only'),
  proofFormat: Yup.string()
    .required('What proof should be submitted'),
  deadline: Yup.date()
    .optional(),

  attachments: Yup.array()
  .nullable()
  .test(
    'fileType',
    'Only image files are allowed',
    (value) => {
      if (!value) return true;
      return value.every(file =>
        ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
      );
    }
  )
  .test(
    'fileSize',
    'Each image must be less than 2MB',
    (value) => {
      if (!value) return true;
      return value.every(file => file.size <= 2 * 1024 * 1024);
    }
  ),

  // Optional/default fields
  visibility: Yup.string().default('Public'),
  tags: Yup.string().default(''),
  termsAgreed: Yup.boolean().oneOf([true], 'You must agree to the terms'),
});
