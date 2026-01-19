import { Prisma, PrismaClient } from '@prisma/client';
import { BaseRepository } from '@/base/repositories/baseRepository';

export class PasswordRepository extends BaseRepository {
  withTransaction(tx: Prisma.TransactionClient): PasswordRepository {
    return new PasswordRepository(tx);
  }

  async findByStudentId(studentId: string) {
    return (this.prisma as PrismaClient).studentPassword.findUnique({ where: { studentId } });
  }

  async create(data: { studentId: string; password: string }) {
    return this.prisma.studentPassword.create({ data });
  }

  async update(studentId: string, hashedPassword: string) {
    return (this.prisma as PrismaClient).studentPassword.update({
      where: { studentId },
      data: {
        password: hashedPassword,
      },
    });
  }
}
