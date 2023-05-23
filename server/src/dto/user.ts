import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const createSchema = z.object({
    username: z.string(),
    email: z.string(),
    avatar: z.string(),
    hashed_password: z.string(),
});
createSchema.parse({
    username: "John Doe",
    email: "johndoe@gmail.com",
    avatar: "Legend of Zelda",
    hashed_password: "Nigerujjhj",
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
loginSchema.parse({
    email: "johndoe@gmail.com",
    password: "Niger",
});
const updateSchema = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    avatar: z.string().optional(),
    hashed_password: z.string().min(6).optional(),
});
updateSchema.parse({
    username: "dickjhonson" || null,
    avatar: "egg" || null,
    email: "johndoe@gmail.com" || null,
    password: "Niger" || null,
});
const deleteSchema = z.object({
    email: z.string().email(),
});
deleteSchema.parse({
    email: "johndoe@gmail.com",
});

export type LoginModel = z.infer<typeof loginSchema>;
export type CreateUserModel = z.infer<typeof createSchema>;
export type DeleteUserModel = z.infer<typeof deleteSchema>;
export type UpdateUserModel = z.infer<typeof createSchema>;
