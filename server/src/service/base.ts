import { prisma } from '../utils/connectDB';

class BaseDAL {
    async find_user_by_email(email: string) {
        try {
            return await prisma.user.findFirst({
                where: {
                    email: email,
                },
            });
        } catch (error) {
            throw new Error('Wrong email');
        }
    }
}

export default new BaseDAL();
