import { Prisma } from '@prisma/client';
import { BaseRepository } from '@/repositories/baseRepository';
import type { HistoryServerCreateInput, HistoryServerUpdateInput } from '@shared/models/history';

export class HistoryRepository extends BaseRepository {
  withTransaction(tx: Prisma.TransactionClient): HistoryRepository {
    return new HistoryRepository(tx);
  }

  async find(historyId: string) {
    return await this.prisma.history.findUnique({
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
  }

  async searchHistories(data: {
    minorCategoryIds?: number[] | undefined;
    departmentIds?: number[] | undefined;
    grades?: number[] | undefined;
  }) {
    const where: Prisma.HistoryWhereInput = {
      student: {
        ...(data.minorCategoryIds?.length
          ? { minorCategoryId: { in: data.minorCategoryIds } }
          : {}),
        ...(data.departmentIds?.length ? { departmentId: { in: data.departmentIds } } : {}),
        ...(data.grades?.length ? { grade: { in: data.grades } } : {}),
      },
    };

    return await this.prisma.history.findMany({
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
  }

  async searchByStartTimeHistories(query: Date) {
    return this.prisma.history.findMany({
      where: {
        validFlag: true,
        student: {
          deleteFlag: false,
        },
        startTime: {
          lte: query,
        },
        OR: [
          {
            endTime: {
              gte: query,
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
  }

  async createHistory(data: HistoryServerCreateInput) {
    const datas = data.studentIds.map((id) => ({
      studentId: id,
      statusId: data.statusId,
      other: data.other,
      startTime: data.startTime,
      endTime: data.endTime ?? null,
      validFlag: true,
    }));

    return Promise.all(
      datas.map((d) =>
        this.prisma.history.create({
          data: d,
          select: {
            historyId: true,
            studentId: true,
            student: {
              select: {
                studentName: true,
                grade: true,
                departmentId: true,
                minorCategoryId: true,
              },
            },
            statusId: true,
            other: true,
            startTime: true,
            endTime: true,
            validFlag: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
      ),
    );
  }

  async updateHistory(data: HistoryServerUpdateInput, historyId: string) {
    const updated = await this.prisma.history.updateMany({
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

    if (updated.count === 0) return null;

    return this.prisma.history.findUnique({
      where: { historyId },
      select: {
        historyId: true,
        studentId: true,
        student: {
          select: {
            studentName: true,
            grade: true,
            departmentId: true,
            minorCategoryId: true,
          },
        },
        statusId: true,
        other: true,
        startTime: true,
        endTime: true,
        validFlag: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteHistory(historyId: string) {
    await this.prisma.history.delete({
      where: {
        historyId,
      },
    });
  }
}
