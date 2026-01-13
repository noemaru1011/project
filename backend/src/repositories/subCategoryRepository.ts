import { Prisma, PrismaClient } from '@prisma/client';
import { BaseRepository } from './baseRepository';

export class SubCategoryRepository extends BaseRepository {
  withTransaction(tx: Prisma.TransactionClient): SubCategoryRepository {
    return new SubCategoryRepository(tx);
  }

  async findAll() {
    return await this.prisma.subCategory.findMany({
      select: {
        subCategoryId: true,
        subCategoryName: true,
      },
      orderBy: { subCategoryId: 'asc' },
    });
  }
}
