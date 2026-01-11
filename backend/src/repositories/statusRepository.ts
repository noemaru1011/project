import { PrismaClient } from '@prisma/client';
import type { Status } from '@shared/types/status';

const prisma = new PrismaClient();

export const StatusRepository = {
  async findAll(): Promise<Status[]> {
    const rows = await prisma.status.findMany({
      select: {
        statusId: true,
        statusName: true,
      },
      orderBy: { statusId: 'asc' },
    });
    return rows.map((row) => ({
      statusId: row.statusId.toString(),
      statusName: row.statusName,
    }));
  },
};
