import { Prisma } from '@prisma/client';
import { UpdateResult } from '@/types/UpdateResult';
import { BaseRepository } from '@/base/repositories/baseRepository';
import type { StudentServerCreateInput, StudentServerUpdateInput } from '@shared/models/student';

export class StudentRepository extends BaseRepository {
  withTransaction(tx: Prisma.TransactionClient): StudentRepository {
    return new StudentRepository(tx);
  }

  //学生1件取得
  async findById(studentId: string) {
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
        createdAt: true,
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
    const current = await this.prisma.student.findUnique({
      where: { studentId },
    });

    // 存在しないID or 削除済
    if (!current || current.deleteFlag) {
      return UpdateResult.NOT_FOUND;
    }

    // 楽観的ロック
    if (current.updatedAt.getTime() !== new Date(data.updatedAt).getTime()) {
      return UpdateResult.OPTIMISTIC_LOCK;
    }

    return await this.prisma.student.update({
      where: {
        studentId,
      },
      data: {
        studentName: data.studentName,
        departmentId: data.departmentId,
        minorCategoryId: data.minorCategoryId,
        grade: data.grade,
      },
    });
  }

  //学生削除
  async delete(studentId: string) {
    const deleted = await this.prisma.student.updateMany({
      where: {
        studentId,
        deleteFlag: false,
      },
      data: {
        deleteFlag: true,
      },
    });
    return deleted.count;
  }

  async search(data: {
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
