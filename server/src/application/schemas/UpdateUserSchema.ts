import z from "zod";
import { id } from "zod/locales";

export const updateUserSchema = z.object({
    id: z.string().min(1, "User id is required"),
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
})

export type updateUserInput = z.infer<typeof updateUserSchema>