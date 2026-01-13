import { Prisma, PrismaClient } from '@prisma/client';
import { BaseRepository } from './baseRepository';

export class StatusRepository extends BaseRepository {
  withTransaction(tx: Prisma.TransactionClient): StatusRepository {
    return new StatusRepository(tx);
  }

  async findAll() {
    return await this.prisma.status.findMany({
      select: {
        statusId: true,
        statusName: true,
      },
      orderBy: { statusId: 'asc' },
    });
  }
}
