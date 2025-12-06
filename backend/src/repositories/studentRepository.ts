import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const StudentRepository = {
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
    prisma.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: {
          studentName: data.studentName,
          email: data.email,
          departmentId: data.departmentId,
          minorCategoryId: data.minorCategoryId,
          grade: data.grade,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      await tx.studentPassword.create({
        data: {
          studentId: student.studentId,
          password: data.password,
          createdAt: new Date(),
          updatedAt: new Date(),
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
    },
    studentId: string,
  ) {
    await prisma.student.update({
      where: {
        studentId,
      },
      data: {
        studentName: data.studentName,
        departmentId: data.departmentId,
        minorCategoryId: data.minorCategoryId,
        grade: data.grade,
        updatedAt: new Date(),
      },
    });
  },

  async deleteStudent(studentId: string) {
    await prisma.student.update({
      where: {
        studentId,
        deleteFlag: false,
      },
      data: {
        deleteFlag: true,
        updatedAt: new Date(),
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

  async resolveMinorCategoryIds(data: {
    minorCategoryId?: number[];
    subCategoryId?: number[];
    categoryId?: number[];
  }): Promise<number[]> {
    let ids: number[] = [];

    if (data.categoryId?.length) {
      const mcs = await prisma.minorCategory.findMany({
        where: {
          subCategory: { categoryId: { in: data.categoryId } },
        },
        select: { minorCategoryId: true },
      });
      ids.push(...mcs.map((m) => m.minorCategoryId));
    }

    if (data.subCategoryId?.length) {
      const mcs = await prisma.minorCategory.findMany({
        where: {
          subCategoryId: { in: data.subCategoryId },
        },
        select: { minorCategoryId: true },
      });
      ids.push(...mcs.map((m) => m.minorCategoryId));
    }

    if (data.minorCategoryId?.length) {
      ids.push(...data.minorCategoryId);
    }

    return [...new Set(ids)];
  },
};
