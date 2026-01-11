import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { formatDateTime } from '@/utils/formatDateTime';
import type { HistoryDetail, HistorySummary } from '@shared/types/history';
import type { HistoreServerForm, HistoryUpdateServerForm } from '@shared/schemas/history';

const prisma = new PrismaClient();

export const HistoryRepository = {
  async find(historyId: string): Promise<HistoryDetail | null> {
    const row = await prisma.history.findUnique({
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
    if (!row) return null;

    return {
      historyId: row.historyId,
      studentName: row.student.studentName,
      grade: row.student.grade.toString(),
      minorCategoryId: row.student.minorCategoryId.toString(),
      departmentId: row.student.departmentId.toString(),
      statusId: row.statusId.toString(),
      other: row.other ?? null,
      startTime: row.startTime.toISOString(),
      endTime: row.endTime?.toISOString() ?? null,
      validFlag: row.validFlag,
      updatedAt: row.updatedAt?.toISOString(),
    };
  },

  async searchHistories(data: {
    minorCategoryIds?: number[] | undefined;
    departmentIds?: number[] | undefined;
    grades?: number[] | undefined;
  }): Promise<HistorySummary[]> {
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

    const rows = await prisma.history.findMany({
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

    return rows.map((row) => ({
      historyId: row.historyId.toString(),
      studentName: row.student.studentName,
      grade: row.student.grade.toString(),
      departmentName: row.student.department.departmentName,
      minorCategoryName: row.student.minorCategory.minorCategoryName,
      statusName: row.status.statusName,
      other: row.other ?? '',
      startTime: formatDateTime(row.startTime)!,
      endTime: row.endTime ? formatDateTime(row.endTime) : '',
    }));
  },

  async searchByStartTimeHistories(query: Date) {
    return prisma.history.findMany({
      where: {
        validFlag: true,
        student: {
          deleteFlag: false,
        },
        startTime: {
          lte: query, // 開始時刻 <= query
        },
        endTime: {
          gte: query, // 終了時刻 >= query
        },
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
  async createHistory(data: HistoreServerForm) {
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

  async updateHistory(data: HistoryUpdateServerForm, historyId: string) {
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
