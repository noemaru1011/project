import { Prisma, PrismaClient } from '@prisma/client';
import { BaseRepository } from '@/base/repositories/baseRepository';

export class AdminRepository extends BaseRepository {
  withTransaction(tx: Prisma.TransactionClient): AdminRepository {
    return new AdminRepository(tx);
  }

  async findByEmail(email: string) {
    return (this.prisma as PrismaClient).admin.findUnique({
      where: { email },
    });
  }
}
