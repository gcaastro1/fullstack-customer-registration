import { z } from 'zod';

export const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  createdAt: z.string().optional(),
  customerId: z.string(),
});

export const createContactSchema = contactSchema.omit({
  createdAt: true,
  id: true,
});

export const updateContactSchema = createContactSchema.partial();

export type contactData = z.infer<typeof contactSchema>;
export type createContactData = z.infer<typeof createContactSchema>;
export type updateContactData = z.infer<typeof updateContactSchema>;
