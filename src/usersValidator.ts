import { z } from 'zod';

const userZodSchema = z.object({
  name: z
    .string()
    .max(60, { message: 'Name must be 5 or fewer characters long. ' }),
  ssn: z.string().regex(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/),
  interests: z.array(z.string()).optional(),
  email: z.string().email({ message: 'Invalid email address.' }).max(50),
});

const userUpdateZodSchema = userZodSchema.partial();

export { userZodSchema, userUpdateZodSchema };
