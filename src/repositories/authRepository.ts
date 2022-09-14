import prisma from "../dbStrategy/database.js";

import { TypeNewUser } from "../types/authTypes.js";

export async function findUserById(id: number) {
  return prisma.user.findUnique({
    where: { id }
  });
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
}

export async function insertNewUser(newUser: TypeNewUser) {
    return prisma.user.create({
      data: newUser,
    });
}
