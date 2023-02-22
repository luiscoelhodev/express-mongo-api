import { z } from 'zod';

export const userZodSchema = z.object({
  name: z
    .string()
    .max(60, { message: 'Name must be 5 or fewer characters long. ' }),
  socialSecurityNumber: z.string().max(14),
  interests: z.array(z.string()).optional(),
  email: z.string().email({ message: 'Invalid email address.' }).max(50),
});
