import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const LoginRepository = {
  async findAdmin(email: string) {
    return prisma.admin.findUnique({
      where: { email },
      select: {
        adminId: true,
        password: true,
      },
    });
  },

  async findStudent(email: string) {
    return prisma.student.findUnique({
      where: { email },
      select: { studentId: true },
    });
  },

  async getStudentPassword(studentId: string) {
    return prisma.studentPassword.findUnique({
      where: { studentId },
      select: {
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
};
