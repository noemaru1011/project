import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import type { StudentServerForm, StudentUpdateServerForm } from '@shared/schemas/student';

const prisma = new PrismaClient();

export const StudentRepository = {
  //学生1件取得
  async find(studentId: string) {
    const student = await prisma.student.findFirst({
      where: {
        studentId,
        deleteFlag: false,
      },
      select: {
        studentId: true,
        studentName: true,
        grade: true,
        departmentId: true,
        email: true,
        minorCategoryId: true,
        updatedAt: true,
      },
    });
    return student ?? null;
  },

  //メールアドレス検証用
  async findByEmail(email: string) {
    return prisma.student.findUnique({
      where: { email, deleteFlag: false },
    });
  },

  //学生新規作成(トランザクション前提)
  async create(tx: Prisma.TransactionClient, data: StudentServerForm) {
    return await tx.student.create({
      data: {
        studentName: data.studentName,
        email: data.email,
        departmentId: data.departmentId,
        minorCategoryId: data.minorCategoryId,
        grade: data.grade,
      },
      select: {
        studentId: true,
        studentName: true,
        grade: true,
        departmentId: true,
        email: true,
        minorCategoryId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  //学生更新
  async update(studentId: string, data: StudentUpdateServerForm) {
    return await prisma.$transaction(async (tx) => {
      const updated = await tx.student.updateMany({
        where: {
          studentId,
          updatedAt: data.updatedAt,
          deleteFlag: false,
        },
        data: {
          studentName: data.studentName,
          departmentId: data.departmentId,
          minorCategoryId: data.minorCategoryId,
          grade: data.grade,
        },
      });

      if (updated.count === 0) return null; // 楽観ロック失敗

      return tx.student.findUnique({
        where: { studentId },
      });
    });
  },

  //学生削除
  async delete(studentId: string) {
    await prisma.student.update({
      where: {
        studentId,
        deleteFlag: false,
      },
      data: {
        deleteFlag: true,
      },
    });
  },

  async searchStudents(data: {
    minorCategoryIds?: number[] | undefined;
    departmentIds?: number[] | undefined;
    grades?: number[] | undefined;
  }) {
    //小隊(大隊・中隊)、学科、学年
    const where: Prisma.StudentWhereInput = {
      deleteFlag: false,
      ...(data.minorCategoryIds?.length ? { minorCategoryId: { in: data.minorCategoryIds } } : {}),
      ...(data.departmentIds?.length ? { departmentId: { in: data.departmentIds } } : {}),
      ...(data.grades?.length ? { grade: { in: data.grades } } : {}),
    };

    return await prisma.student.findMany({
      where,
      select: {
        deleteFlag: false,
        studentId: true,
        studentName: true,
        grade: true,
        minorCategory: {
          select: {
            minorCategoryName: true,
            subCategory: {
              select: {
                subCategoryName: true,
                category: {
                  select: {
                    categoryName: true,
                  },
                },
              },
            },
          },
        },
        department: {
          select: {
            departmentName: true,
          },
        },
      },
      orderBy: [{ minorCategory: { minorCategoryName: 'asc' } }, { grade: 'desc' }],
    });
  },
};
