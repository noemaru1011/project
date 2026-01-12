import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import type { HistoryServerCreateInput, HistoryServerUpdateInput } from '@shared/models/history';

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
        studentId: true,
        statusId: true,
        startTime: true,
        endTime: true,
        other: true,
        validFlag: true,
        createdAt: true,
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

    return await prisma.history.findMany({
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
  async createHistory(data: HistoryServerCreateInput) {
    const datas = data.studentIds.map((id) => ({
      studentId: id,
      statusId: data.statusId,
      other: data.other,
      startTime: data.startTime,
      endTime: data.endTime ?? null,
      validFlag: true,
    }));

    return await prisma.$transaction(
      datas.map((d) =>
        prisma.history.create({
          data: d,
          select: {
            historyId: true,
            studentId: true,
            student: { select: { studentName: true, grade: true, departmentId: true, minorCategoryId: true } },
            statusId: true,
            other: true,
            startTime: true,
            endTime: true,
            validFlag: true,
            createdAt: true,
            updatedAt: true,
          },
        })
      )
    );
  },

  async updateHistory(data: HistoryServerUpdateInput, historyId: string) {
    return await prisma.$transaction(async (tx) => {
      const updated = await tx.history.updateMany({
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

      if (updated.count === 0) return null; // 楽観ロック失敗

      return tx.history.findUnique({
        where: { historyId },
        select: {
          historyId: true,
          studentId: true,
          student: { select: { studentName: true, grade: true, departmentId: true, minorCategoryId: true } },
          statusId: true,
          other: true,
          startTime: true,
          endTime: true,
          validFlag: true,
          createdAt: true,
          updatedAt: true,
        },
      });
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
