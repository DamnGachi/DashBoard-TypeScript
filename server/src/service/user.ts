import {
    CreateUserModel,
    LoginModel,
    UpdateUserModel,
    DeleteUserModel,
} from "../dto/user";
import connectDB, { prisma } from "../utils/connectDB";
import BaseDAL from "./base";
import token, { isValidPassword } from "../utils/token";
import bcrypt from "bcrypt";

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
        if (await isValidPassword(existingUser, data.hashed_password)) {
            return token.createToken(data.email);
        } else {
            throw new Error("Wrong credentials given");
        }
    }
    public async update(data: UpdateUserModel) {
        try {
            const updateUser = await prisma.user.update({
                where: {
                    email: data.email,
                },
                data: {
                    username: data.username,
                    avatar: data.avatar,
                    hashed_password: data.hashed_password,
                },
            });
            return "Successfully Updated";
        } catch (err) {
            return `Something went wrong ${err}`;
        }
    }
    public async delete(data: DeleteUserModel) {
        try {
            const deleteUsers = await prisma.user.delete({
                where: {
                    email: data.email,
                },
            });
            return "Successfully deleted";
        } catch (err) {
            return `Something went wrong ${err}`;
        }
    }
}
export default new UserDAL();
