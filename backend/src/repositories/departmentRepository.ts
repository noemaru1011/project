import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DepartmentRepository = {
  async findAll() {
    return prisma.department.findMany({
      select: {
        departmentId: true,
        departmentName: true,
      },
      orderBy: { departmentId: 'asc' },
    });
  },
};
