import jwt from "jsonwebtoken";

interface Token extends Object {
    id: string;
    expireIn: number;
}
export const createToken = (email: string): string => {
    return jwt.sign({ id: email }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: process.env.EXPIRES_IN_SECONDS,
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

export default { createToken, verifyToken };
