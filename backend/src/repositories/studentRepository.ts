import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const StudentRepository = {
  async findAll() {
    return await prisma.student.findMany({
      where: {
        deleteFlag: false,
      },
      select: {
        studentId: true,
        studentName: true,
        grade: true,
        minorCategory: {
          select: {
            minorCategoryName: true,
          },
        },
      },
      orderBy: [
        { minorCategory: { minorCategoryName: "asc" } },
        { grade: "desc" },
      ],
    });
  },

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
    return prisma.$transaction(async (tx) => {
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

      return student;
    });
  },

  async updateStudent(
    data: {
      studentName: string;
      departmentId: number;
      minorCategoryId: number;
      grade: number;
    },
    studentId: string
  ) {
    return await prisma.student.update({
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
    return await prisma.student.update({
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
};
