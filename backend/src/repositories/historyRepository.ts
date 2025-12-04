import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const HistoryRepository = {
  async createHistory(data: {
    studentId: string[];
    StatusId: number;
    other: string;
    startTime: Date;
    endTime?: Date | null;
  }) {
    const records = data.studentId.map((id) => ({
      studentId: id,
      statusId: data.StatusId,
      other: data.other,
      startTime: data.startTime,
      endTime: data.endTime ?? null,
      validFlag: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return prisma.history.createMany({
      data: records,
    });
  },
};
