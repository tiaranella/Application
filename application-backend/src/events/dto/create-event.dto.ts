import * as yup from 'yup';

export const CreateEventSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().optional(),
  date: yup.date().required(),
  location: yup.string().required(),
  capacity: yup.number().positive().integer().optional().nullable(),
  isPublic: yup.boolean().default(true),
});

export type CreateEventDto = yup.InferType<typeof CreateEventSchema>;