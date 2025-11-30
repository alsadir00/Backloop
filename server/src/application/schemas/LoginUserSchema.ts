import z from "zod";


export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;