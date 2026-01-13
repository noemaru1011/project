import { Prisma, PrismaClient } from '@prisma/client';
import { BaseRepository } from './baseRepository';

export class CategoryRepository extends BaseRepository {
  withTransaction(tx: Prisma.TransactionClient): CategoryRepository {
    return new CategoryRepository(tx);
  }

  async findAll() {
    return await this.prisma.category.findMany({
      select: {
        categoryId: true,
        categoryName: true,
      },
      orderBy: { categoryId: 'asc' },
    });
  }
}
