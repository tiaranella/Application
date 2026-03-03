import * as yup from 'yup';

export const RegisterSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  name: yup.string().required(),
});

export type RegisterDto = yup.InferType<typeof RegisterSchema>;

