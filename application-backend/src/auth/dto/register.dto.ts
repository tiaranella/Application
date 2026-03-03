import * as yup from 'yup';

export const RegisterSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  name: yup
    .string()
    .required('Name is required'),
});

export type RegisterDto = yup.InferType<typeof RegisterSchema>;
