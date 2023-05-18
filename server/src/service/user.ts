import UserModel from '../dto/user';
import connectDB, { prisma } from '../utils/connectDB';

// ConnectDB
connectDB();
class UserDAL {
  async create(data: UserModel) {
    try {
      return await prisma.user.findFirst({
        where: {
          email: data.email,
          hashed_password: data.hashed_password,
        }
      });
    } catch (error) {
      throw new Error("Неверный email или пароль");
    }
  }
}


export default UserDAL