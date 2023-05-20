import { z } from 'zod';

// creating a schema for strings
const UserModel = z.object({
    username: z.string(),
    email: z.string(),
    avatar: z.string(),
    hashed_password: z.string(),
    role_id: z.number(),
});

// parsing
UserModel.parse({
    username: 'John Doe',
    email: 'johndoe@gmail.com',
    avatar: 'Legend of Zelda',
    hashed_password: 'Niger',
    role_id: 1,
});

// extract the inferred type
type UserModel = z.infer<typeof UserModel>;
// { username: string }

export default UserModel;
