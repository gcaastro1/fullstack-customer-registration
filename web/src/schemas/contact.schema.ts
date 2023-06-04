import { z } from 'zod';

export const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  createdAt: z.string(),
  customerId: z.string(),
});

export type ccontactData = z.infer<typeof contactSchema>;
