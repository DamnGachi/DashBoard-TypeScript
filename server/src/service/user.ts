import {
    CreateUserModel,
    LoginModel,
    UpdateUserModel,
    DeleteUserModel,
} from "../dto/user";
import connectDB, { prisma } from "../utils/connectDB";
import BaseDAL from "./base";
import token from "../utils/token";
import bcrypt from "bcrypt";

connectDB();

class UserDAL {
    async create(data: CreateUserModel) {
        const existingUser = await BaseDAL.find_user_by_email(data.email);

        if (!existingUser) {
            const hash = await bcrypt.hash(data.hashed_password, 10);
            data.hashed_password = hash;

            await prisma.user.create({ data });
            const accessToken = token.createToken(data.email);

            console.log("Пользователь создан успешно.");

            return accessToken;
        } else {
            console.log("Пользователь с таким email уже существует.");
            return "uvolen";
        }
    }

    public async login(data: LoginModel) {
        const existingUser = await BaseDAL.find_user_by_email(data.email);
        if (!existingUser) {
            console.log("Пользователь с таким email не существует.");

            return "User NOT found";
        }
        if (await isValidPassword(existingUser, data.password)) {
            return token.createToken(data.email);
        } else {
            throw new Error("Wrong credentials given");
        }
    }
    public async update(data: UpdateUserModel) {
        null;
    }
    public async delete(data: DeleteUserModel) {
        null;
    }
}
async function isValidPassword(user: any, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.hashed_password);
}
export default new UserDAL();
