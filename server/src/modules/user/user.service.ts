import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/db.server";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, salt, hashed_password: hash },
  });

  return user;
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      email: true,
      username: true,
      id: true,
    },
  });
}