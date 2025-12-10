import { PrismaClient } from '@prisma/client';
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
        other: true,
        startTime: true,
        endTime: true,
      },
    });
  },

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
