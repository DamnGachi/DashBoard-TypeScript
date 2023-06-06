import { prisma } from "../utils/connectDB";
import jwt from "jsonwebtoken";

class BaseDAL {
    async find_user_by_email(email: string) {
        try {
            return await prisma.user.findFirst({
                where: {
                    email: email,
                },
            });
        } catch (error) {
            throw new Error("Wrong email");
        }
    }

    async getUserFromToken(token: any): Promise<jwt.VerifyErrors | any> {
        return new Promise(async (resolve, reject) => {
            if (!token) {
                throw new Error("Missing authorization token");
            }
            
            const tokenValue = token.split(" ")[1];
            jwt.verify(
                tokenValue,
                process.env.JWT_SECRET as jwt.Secret,
                async (err: any, payload: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        try {
                            const user = await prisma.user.findUnique({
                                where: { email: payload.id },
                            });
                            resolve(user);
                        } catch (error) {
                            reject(error);
                        }
                    }
                }
            );
        });
    }
}

export default new BaseDAL();
