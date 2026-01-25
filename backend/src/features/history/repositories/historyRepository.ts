import { Prisma } from '@prisma/client';
import { UpdateResult } from '@/types/UpdateResult';
import { BaseRepository } from '@/base/repositories/baseRepository';
import type { HistoryServerCreateInput, HistoryServerUpdateInput } from '@shared/models/history';

export class HistoryRepository extends BaseRepository {
  withTransaction(tx: Prisma.TransactionClient): HistoryRepository {
    return new HistoryRepository(tx);
  }

  async findById(historyId: string) {
    return await this.prisma.history.findUnique({
      where: {
        historyId,
        student: { deleteFlag: false },
      },
      select: {
        student: {
          select: {
            studentName: true,
            department: {
              select: {
                departmentName: true,
              },
            },
            grade: true,
            minorCategory: {
              select: {
                minorCategoryName: true,
              },
            },
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

  async search(data: {
    minorCategoryIds?: number[] | undefined;
    departmentIds?: number[] | undefined;
    grades?: number[] | undefined;
    page?: number;
    limit?: number;
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

    const page = data.page ?? 1;
    const limit = data.limit ?? 10;
    const skip = (page - 1) * limit;

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
      skip,
      take: limit,
    });
  }

  async countSearch(data: {
    minorCategoryIds?: number[] | undefined;
    departmentIds?: number[] | undefined;
    grades?: number[] | undefined;
  }): Promise<number> {
    const where: Prisma.HistoryWhereInput = {
      student: {
        ...(data.minorCategoryIds?.length
          ? { minorCategoryId: { in: data.minorCategoryIds } }
          : {}),
        ...(data.departmentIds?.length ? { departmentId: { in: data.departmentIds } } : {}),
        ...(data.grades?.length ? { grade: { in: data.grades } } : {}),
      },
    };

    return await this.prisma.history.count({ where });
  }

  async searchByStartTime(query: Date) {
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

  async create(data: HistoryServerCreateInput) {
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
        }),
      ),
    );
  }

  async update(data: HistoryServerUpdateInput, historyId: string) {
    const current = await this.prisma.history.findUnique({
      where: { historyId },
    });

    // 存在しないID
    if (!current) {
      return UpdateResult.NOT_FOUND;
    }

    // 楽観的ロック
    if (current.updatedAt.getTime() !== new Date(data.updatedAt).getTime()) {
      return UpdateResult.OPTIMISTIC_LOCK;
    }

    return await this.prisma.history.update({
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
  }

  async delete(historyId: string) {
    const result = await this.prisma.history.deleteMany({
      where: { historyId },
    });
    return result.count;
  }

  /**
   * repository に重複確認用のヘルパーメソッド
   */
  async findOverlappingHistories(studentId: string, startTime: Date, endTime: Date | null) {
    return this.prisma.history.findMany({
      where: {
        studentId,
        validFlag: true,
        AND: [
          {
            startTime: { lte: endTime ?? new Date('9999-12-31') },
          },
          {
            OR: [{ endTime: { gte: startTime } }, { endTime: null }],
          },
        ],
      },
      select: {
        student: { select: { studentName: true } },
      },
    });
  }
}
