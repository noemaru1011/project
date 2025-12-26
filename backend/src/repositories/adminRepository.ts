import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AdminRepository = {
  async findByEmail(email: string) {
    return prisma.admin.findUnique({
      where: { email },
    });
  },
};
