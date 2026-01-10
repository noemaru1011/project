import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const HistoryRepository = {
  async find(historyId: string) {
    return await prisma.history.findUnique({
      where: {
        historyId,
        student: { deleteFlag: false },
      },
      select: {
        student: {
          select: {
            studentName: true,
            departmentId: true,
            grade: true,
            minorCategoryId: true,
          },
        },
        historyId: true,
        statusId: true,
        startTime: true,
        endTime: true,
        other: true,
        validFlag: true,
        updatedAt: true,
      },
    });
  },

  async searchHistories(data: {
    minorCategoryIds?: number[] | undefined;
    departmentIds?: number[] | undefined;
    grades?: number[] | undefined;
  }) {
    //小隊(大隊・中隊)、学科、学年
    const where: Prisma.HistoryWhereInput = {
      student: {
        ...(data.minorCategoryIds?.length
          ? { minorCategoryId: { in: data.minorCategoryIds } }
          : {}),
        ...(data.departmentIds?.length ? { departmentId: { in: data.departmentIds } } : {}),
        ...(data.grades?.length ? { grade: { in: data.grades } } : {}),
      },
    };

    return prisma.history.findMany({
      where,
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
        status: {
          select: {
            statusName: true,
          },
        },
        other: true,
        startTime: true,
        endTime: true,
      },
    });
  },

  async searchByStartTimeHistories(query?: Date) {
    return prisma.history.findMany({
      where: {
        validFlag: true,
        student: {
          deleteFlag: false,
        },
        ...(query
          ? {
              startTime: {
                lte: query, // 開始時刻 <= query
              },
              OR: [
                {
                  endTime: {
                    gte: query, // 終了時刻 >= query
                  },
                },
                {
                  endTime: null,
                },
              ],
            }
          : {}),
      },
      select: {
        statusId: true,
        student: {
          select: {
            grade: true,
            departmentId: true,
            minorCategoryId: true,
            minorCategory: {
              select: {
                subCategoryId: true,
                subCategory: {
                  select: {
                    categoryId: true,
                  },
                },
              },
            },
          },
        },
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

    return prisma.history.createMany({
      data: records,
    });
  },

  async updateHistory(
    data: {
      statusId: number;
      other: string;
      startTime: Date;
      endTime?: Date | null;
      validFlag: boolean;
      updatedAt: Date;
    },
    historyId: string,
  ) {
    return await prisma.history.updateMany({
      where: {
        historyId,
        updatedAt: data.updatedAt,
      },
      data: {
        statusId: data.statusId,
        other: data.other,
        startTime: data.startTime,
        endTime: data.endTime,
        validFlag: data.validFlag,
      },
    });
  },

  async deleteHistory(historyId: string) {
    await prisma.history.delete({
      where: {
        historyId,
      },
    });
  },
};
