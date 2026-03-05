import * as yup from 'yup';

export const UpdateEventSchema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  date: yup.date().optional(),
  location: yup.string().optional(),
  capacity: yup.number().positive().integer().optional().nullable(),
  isPublic: yup.boolean().optional(),
});

export type UpdateEventDto = yup.InferType<typeof UpdateEventSchema>;
