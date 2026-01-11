import { PrismaClient } from '@prisma/client';
import type { Department } from '@shared/types/department';

const prisma = new PrismaClient();

export const DepartmentRepository = {
  async findAll(): Promise<Department[]> {
    const rows = await prisma.department.findMany({
      select: {
        departmentId: true,
        departmentName: true,
      },
      orderBy: { departmentId: 'asc' },
    });
    return rows.map((row) => ({
      departmentId: row.departmentId.toString(),
      departmentName: row.departmentName,
    }));
  },
};
