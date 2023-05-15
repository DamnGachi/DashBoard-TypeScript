
import { hashPassword } from "../utils/hash";
import { CreateUserInput } from "../dto/user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const { hash, salt } = hashPassword(password);

  // const user = await prisma.user.create({
  //   data: { ...rest, salt, hashed_password: hash },
  // });

  // return user;
}
