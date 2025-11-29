import { z } from 'zod';


export const RegisterUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;