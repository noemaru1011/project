import { PrismaClient } from '@prisma/client';
import { AppError } from '@/errors/AppError';
const prisma = new PrismaClient();

export const StudentRepository = {
  //学生1件取得
  async find(studentId: string) {
    return await prisma.student.findFirst({
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
  },
  async createStudent(data: {
    studentName: string;
    email: string;
    departmentId: number;
    minorCategoryId: number;
    grade: number;
    password: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: {
          studentName: data.studentName,
          email: data.email,
          departmentId: data.departmentId,
          minorCategoryId: data.minorCategoryId,
          grade: data.grade,
        },
      });

      await tx.studentPassword.create({
        data: {
          studentId: student.studentId,
          password: data.password,
        },
      });
    });
  },

  async updateStudent(
    data: {
      studentName: string;
      departmentId: number;
      minorCategoryId: number;
      grade: number;
      updatedAt: Date;
    },
    studentId: string,
  ) {
    const result = await prisma.student.updateMany({
      where: {
        studentId,
        updatedAt: data.updatedAt, // ★ 楽観ロック条件
      },
      data: {
        studentName: data.studentName,
        departmentId: data.departmentId,
        minorCategoryId: data.minorCategoryId,
        grade: data.grade,
      },
    });

    if (result.count === 0) {
      throw new AppError(
        'CONFLICT',
        '他のユーザーによって更新されています。再読み込みしてください。',
        409,
      );
    }
  },

  async deleteStudent(studentId: string) {
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
    departments?: number[] | undefined;
    grade?: number[] | undefined;
  }) {
    const andConditions: any[] = [{ deleteFlag: false }];

    if (data.minorCategoryIds?.length) {
      andConditions.push({ minorCategoryId: { in: data.minorCategoryIds } });
    }

    if (data.departments?.length) {
      andConditions.push({ departmentId: { in: data.departments } });
    }

    if (data.grade?.length) {
      andConditions.push({ grade: { in: data.grade } });
    }

    return await prisma.student.findMany({
      where: { AND: andConditions },
      select: {
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
