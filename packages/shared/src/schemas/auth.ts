import z from 'zod';

export const authenticateBodySchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 caracteres'),
});

export const createAccountBodySchema = z.object({
  name: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.email('E-mail inválido'),
  password: z
    .string()
    .min(8, 'Senha deve conter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma maiúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
});

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
