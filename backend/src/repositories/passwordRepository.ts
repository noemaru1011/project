import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const PasswordRepository = {
  findByStudentId: (studentId: string) =>
    prisma.studentPassword.findUnique({ where: { studentId } }),

  async create(tx: Prisma.TransactionClient, data: { studentId: string; password: string }) {
    return tx.studentPassword.create({ data });
  },

  updatePassword: (studentId: string, hashedPassword: string) =>
    prisma.studentPassword.update({
      where: { studentId },
      data: {
        password: hashedPassword,
      },
    }),
};
