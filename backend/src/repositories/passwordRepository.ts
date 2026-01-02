import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const PasswordRepository = {
  async findByStudentId(studentId: string) {
    return prisma.studentPassword.findUnique({ where: { studentId } });
  },

  async create(tx: Prisma.TransactionClient, data: { studentId: string; password: string }) {
    return tx.studentPassword.create({ data });
  },

  async update(studentId: string, hashedPassword: string) {
    return prisma.studentPassword.update({
      where: { studentId },
      data: {
        password: hashedPassword,
      },
    });
  },
};
