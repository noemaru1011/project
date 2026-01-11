import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import type { StudentDetail, StudentNew, StudentSummary } from '@shared/types/student';

const prisma = new PrismaClient();

export const StudentRepository = {
  //学生1件取得
  async find(studentId: string): Promise<StudentDetail | null> {
    const row = await prisma.student.findFirst({
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
    if (!row) return null;

    return {
      studentId: row.studentId,
      studentName: row.studentName,
      grade: row.grade.toString(),
      departmentId: row.departmentId.toString(),
      email: row.email,
      minorCategoryId: row.minorCategoryId?.toString() ?? null,
      updatedAt: row.updatedAt.toISOString(),
    };
  },

  //メールアドレス検証用
  async findByEmail(email: string) {
    return prisma.student.findUnique({
      where: { email, deleteFlag: false },
    });
  },

  //学生新規作成(トランザクション前提)
  async create(
    tx: Prisma.TransactionClient,
    data: {
      studentName: string;
      email: string;
      departmentId: number;
      minorCategoryId: number;
      grade: number;
    },
  ): Promise<StudentNew> {
    const row = await tx.student.create({
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

    return {
      studentId: row.studentId,
      studentName: row.studentName,
      grade: row.grade.toString(),
      departmentId: row.departmentId.toString(),
      email: row.email,
      minorCategoryId: row.minorCategoryId?.toString(),
      createdAt: row.updatedAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  },

  //学生更新
  async update(
    studentId: string,
    data: {
      studentName: string;
      departmentId: number;
      minorCategoryId: number;
      grade: number;
      updatedAt: Date;
    },
  ): Promise<StudentDetail | null> {
    const result = await prisma.$transaction(async (tx) => {
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

      //更新失敗
      if (updated.count === 0) {
        return null;
      }

      return tx.student.findUnique({
        where: { studentId },
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
    });

    if (!result) return null;

    return {
      studentId: result.studentId,
      studentName: result.studentName,
      grade: result.grade.toString(),
      departmentId: result.departmentId.toString(),
      email: result.email,
      minorCategoryId: result.minorCategoryId?.toString() ?? null,
      updatedAt: result.updatedAt.toISOString(),
    };
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
  }): Promise<StudentSummary[]> {
    //小隊(大隊・中隊)、学科、学年
    const where: Prisma.StudentWhereInput = {
      deleteFlag: false,
      ...(data.minorCategoryIds?.length ? { minorCategoryId: { in: data.minorCategoryIds } } : {}),
      ...(data.departmentIds?.length ? { departmentId: { in: data.departmentIds } } : {}),
      ...(data.grades?.length ? { grade: { in: data.grades } } : {}),
    };

    const students = await prisma.student.findMany({
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

    return students.map((student) => ({
      studentId: student.studentId.toString(),
      studentName: student.studentName,
      grade: student.grade.toString(),
      departmentName: student.department.departmentName,
      minorCategoryName: student.minorCategory.minorCategoryName,
      subCategoryName: student.minorCategory.subCategory.subCategoryName,
      categoryName: student.minorCategory.subCategory.category.categoryName,
    }));
  },
};
