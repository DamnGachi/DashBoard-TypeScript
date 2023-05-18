import UserModel from '../dto/user';
import connectDB, { prisma } from '../utils/connectDB';
import BaseDAL from "./base";
// ConnectDB
connectDB();
class UserDAL {

  async create(data: UserModel) {
    const existingUser = await BaseDAL.find_user_by_email(data.email);

    if (!existingUser) {
      await prisma.user.create({ data });
      console.log('Пользователь создан успешно.');
      return "hired"
    } else {
      console.log('Пользователь с таким email уже существует.');
      return "uvolen"
    }

  }
}


export default new UserDAL;