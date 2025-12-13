import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const PasswordRepository = {
  findByStudentId: (studentId: string) =>
    prisma.studentPassword.findUnique({ where: { studentId } }),

  updatePassword: (studentId: string, hashedPassword: string) =>
    prisma.studentPassword.update({
      where: { studentId },
      data: {
        password: hashedPassword,
      },
    }),
};
