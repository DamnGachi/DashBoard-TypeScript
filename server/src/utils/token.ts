import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginModel } from "../dto/user";
import Token from "./interfaces/token";

export const createToken = (email: string): string => {
    return jwt.sign({ id: email }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: "30d",
        algorithm: "HS256",
    });
};

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as Token);
            }
        );
    });
};
export async function isValidPassword(
    user: LoginModel,
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, user.hashed_password);
}

export default { createToken, verifyToken, isValidPassword };
