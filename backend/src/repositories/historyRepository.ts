import { PrismaClient } from '@prisma/client';
import { AppError } from '@/errors/AppError';
const prisma = new PrismaClient();

export const HistoryRepository = {
  async searchHistoies(data: {
    minorCategoryIds?: number[] | undefined;
    departments?: number[] | undefined;
    grade?: number[] | undefined;
  }) {
    // History テーブルに deleteFlag は無いので削除
    const andConditions: any[] = [];

    if (data.minorCategoryIds?.length) {
      andConditions.push({
        student: { minorCategoryId: { in: data.minorCategoryIds } },
      });
    }

    if (data.departments?.length) {
      andConditions.push({
        student: { departmentId: { in: data.departments } },
      });
    }

    if (data.grade?.length) {
      andConditions.push({
        student: { grade: { in: data.grade } },
      });
    }

    return prisma.history.findMany({
      where: { AND: andConditions },
      select: {
        student: {
          select: {
            studentId: true,
            studentName: true,
            grade: true,
            department: { select: { departmentName: true } },
            minorCategory: {
              select: {
                minorCategoryName: true,
                subCategory: {
                  select: {
                    subCategoryName: true,
                    category: { select: { categoryName: true } },
                  },
                },
              },
            },
          },
        },
        historyId: true,
        other: true,
        startTime: true,
        endTime: true,
      },
    });
  },

  async createHistory(data: {
    studentIds: string[];
    statusId: number;
    other: string;
    startTime: Date;
    endTime?: Date | null;
  }) {
    const records = data.studentIds.map((id) => ({
      studentId: id,
      statusId: data.statusId,
      other: data.other,
      startTime: data.startTime,
      endTime: data.endTime ?? null,
      validFlag: true,
    }));

    console.log(records);
    return prisma.history.createMany({
      data: records,
    });
  },

  async findById(historyId: string) {
    return await prisma.history.findFirst({
      where: {
        historyId,
      },
      select: {
        historyId: true,
        student: {
          select: {
            studentId: true,
            studentName: true,
            grade: true,
            department: { select: { departmentName: true } },
            minorCategory: {
              select: {
                minorCategoryName: true,
              },
            },
          },
        },
        status: {
          select: {
            statusId: true,
            statusName: true,
          },
        },
        other: true,
        startTime: true,
        endTime: true,
      },
    });
  },

  async updateHistory(
    data: {
      statusId: number;
      other: string;
      startTime: Date;
      endTime?: Date | null;
    },
    historyId: string,
  ) {
    const result = await prisma.history.updateMany({
      where: {
        historyId,
      },
      data: {
        statusId: data.statusId,
        other: data.other,
        startTime: data.startTime,
        endTime: data.endTime ?? null,
      },
    });

    if (result.count === 0) {
      throw new AppError('NOT_FOUND', '履歴が見つかりません', 404);
    }
  },

  async deleteHistory(historyId: string) {
    const result = await prisma.history.deleteMany({
      where: {
        historyId,
      },
    });

    if (result.count === 0) {
      throw new AppError('NOT_FOUND', '履歴が見つかりません', 404);
    }
  },
};
