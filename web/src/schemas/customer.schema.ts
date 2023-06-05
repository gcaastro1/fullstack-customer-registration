import { z } from 'zod';
import { contactSchema } from './contact.schema';

export const customerSchema = z.object({
  id: z.string(),
  name: z.string().nonempty('Nome é obrigatório.'),
  email: z.string().email('E-mail invalido.'),
  password: z.string().nonempty('Senha é obrigatória.'),
  phone: z.string().nonempty('Telefone é obrigatório.'),
  createdAt: z.string(),
  contacts: contactSchema.array(),
});

export type customerData = z.infer<typeof customerSchema>;

export const loginSchema = z.object({
  email: z.string().email('E-mail invalido.'),
  password: z.string().nonempty('Senha é obrigatória.'),
});

export const registerSchema = customerSchema
  .extend({
    confirm_password: z
      .string()
      .nonempty('Confirmação de senha é obrigatória.'),
  })
  .omit({
    createdAt: true,
    contacts: true,
    id: true,
  });

export const updateCustomertSchema = registerSchema
  .partial()
  .omit({ password: true })
  .extend({ password: z.string().optional() });

export type loginData = z.infer<typeof loginSchema>;
export type registerData = z.infer<typeof registerSchema>;
export type updateCustomerData = z.infer<typeof updateCustomertSchema>;
