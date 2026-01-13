import { Prisma, PrismaClient } from '@prisma/client';
import type { StudentServerCreateInput, StudentServerUpdateInput } from '@shared/models/student';

export class StudentRepository {
  constructor(private prisma: Prisma.TransactionClient | PrismaClient) {}

  //学生1件取得
  async find(studentId: string) {
    const student = await this.prisma.student.findFirst({
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
  }

  //メールアドレス検証用
  async findByEmail(email: string) {
    return this.prisma.student.findUnique({
      where: { email, deleteFlag: false },
    });
  }

  //学生新規作成
  async create(data: StudentServerCreateInput) {
    return await this.prisma.student.create({
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
        updatedAt: true,
        createdAt: true,
      },
    });
  }

  //学生更新
  async update(studentId: string, data: StudentServerUpdateInput) {
    const updated = await this.prisma.student.updateMany({
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

    return this.prisma.student.findUnique({
      where: { studentId },
    });
  }

  //学生削除
  async delete(studentId: string) {
    await this.prisma.student.update({
      where: {
        studentId,
        deleteFlag: false,
      },
      data: {
        deleteFlag: true,
      },
    });
  }

  async searchStudents(data: {
    minorCategoryIds?: number[] | undefined;
    departmentIds?: number[] | undefined;
    grades?: number[] | undefined;
  }) {
    const where: Prisma.StudentWhereInput = {
      deleteFlag: false,
      ...(data.minorCategoryIds?.length ? { minorCategoryId: { in: data.minorCategoryIds } } : {}),
      ...(data.departmentIds?.length ? { departmentId: { in: data.departmentIds } } : {}),
      ...(data.grades?.length ? { grade: { in: data.grades } } : {}),
    };

    return await this.prisma.student.findMany({
      where,
      select: {
        studentId: true,
        studentName: true,
        grade: true,
        minorCategory: {
          select: {
            minorCategoryName: true,
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
  }
}
