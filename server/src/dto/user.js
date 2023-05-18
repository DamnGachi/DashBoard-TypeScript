"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// creating a schema for strings
const UserModel = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string(),
    avatar: zod_1.z.string(),
    hashed_password: zod_1.z.string(),
    role_id: zod_1.z.number(),
});
// parsing
UserModel.parse({
    username: "John Doe",
    email: "johndoe@gmail.com",
    avatar: "Legend of Zelda",
    hashed_password: "Niger",
    role_id: 1
});
// { username: string }
exports.default = UserModel;
