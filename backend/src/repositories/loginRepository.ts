import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const LoginRepository = {
  async findAdmin(email: string) {
    return prisma.admin.findUnique({ where: { email } });
  },

  async findStudent(email: string) {
    return prisma.student.findUnique({ where: { email } });
  },

  async getStudentPassword(studentId: string) {
    return prisma.studentPassword.findUnique({ where: { studentId } });
  },
};
