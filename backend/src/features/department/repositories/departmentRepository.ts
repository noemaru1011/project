import { Prisma } from '@prisma/client';
import { BaseRepository } from '@/repositories/baseRepository';

export class DepartmentRepository extends BaseRepository {
  withTransaction(tx: Prisma.TransactionClient): DepartmentRepository {
    return new DepartmentRepository(tx);
  }

  async findAll() {
    return await this.prisma.department.findMany({
      select: {
        departmentId: true,
        departmentName: true,
      },
      orderBy: { departmentId: 'asc' },
    });
  }
}
