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

    async getUserFromToken(token: string): Promise<jwt.VerifyErrors | any> {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                process.env.JWT_SECRET as jwt.Secret,
                (err, payload) => {
                    if (err) return reject(err);

                    resolve(payload);
                }
            );
        });
    }
}

export default new BaseDAL();
