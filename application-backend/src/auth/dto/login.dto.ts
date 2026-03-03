import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export type LoginDto = yup.InferType<typeof LoginSchema>;
