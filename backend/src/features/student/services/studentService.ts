import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { UpdateResult } from '@/types/UpdateResult';
import { StudentRepository } from '@/features/student/repositories/studentRepository';
import { PasswordRepository } from '@/features/auth/repositories/passwordRepository';
import { MinorCategoryRepository } from '@/features/minorCategory/repositories/minorCategoryRepository';
import {
  generatePassword,
  sendAccountEmail,
  toStudentResponse,
  toStudentSummary,
} from '@/features/student/utils';
import {
  OptimisticLockError,
  InvalidReferenceError,
  NotFoundError,
  EmailDuplicateError,
} from '@/errors';
import type {
  StudentResponse,
  StudentSummary,
  StudentServerCreateInput,
  StudentServerUpdateInput,
  StudentServerSearchInput,
} from '@shared/models/student';

export class StudentService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly studentRepo: StudentRepository,
    private readonly passwordRepo: PasswordRepository,
    private readonly minorCategoryRepo: MinorCategoryRepository,
    private readonly mailer: typeof sendAccountEmail,
  ) {}

  async getStudent(studentId: string): Promise<StudentResponse> {
    const student = await this.studentRepo.findById(studentId);
    if (student == null) throw new NotFoundError();
    return toStudentResponse(student);
  }

  async createStudent(data: StudentServerCreateInput): Promise<StudentResponse> {
    try {
      //パスワード作成
      const plainPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      //トランザクション内で学生テーブルと学生パスワードテーブルを作成
      const student = await this.prisma.$transaction(async (tx) => {
        const txStudentRepo = this.studentRepo.withTransaction(tx);
        const txPasswordRepo = this.passwordRepo.withTransaction(tx);

        const student = await txStudentRepo.create(data);
        await txPasswordRepo.create({
          studentId: student.studentId,
          password: hashedPassword,
        });
        return student;
      });

      //メール送信
      await this.mailer(data.email, plainPassword);

      return toStudentResponse(student);
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // メールアドレス重複 (Unique constraint failed)
        if (err.code === 'P2002' && (err.meta?.target as string[])?.includes('email')) {
          throw new EmailDuplicateError();
        }
        // 外部キー制約違反 (Foreign key constraint failed)
        if (err.code === 'P2003') {
          throw new InvalidReferenceError();
        }
      }
      throw err;
    }
  }

  async updateStudent(studentId: string, data: StudentServerUpdateInput): Promise<StudentResponse> {
    try {
      const student = await this.studentRepo.update(studentId, data);

      //更新失敗時のエラー処理
      if (student === UpdateResult.NOT_FOUND) throw new NotFoundError();
      if (student === UpdateResult.OPTIMISTIC_LOCK) throw new OptimisticLockError();

      return toStudentResponse(student);
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // 外部キー制約違反 (Foreign key constraint failed)
        if (err.code === 'P2003') {
          throw new InvalidReferenceError();
        }
      }
      throw err;
    }
  }

  async deleteStudent(studentId: string) {
    const student = await this.studentRepo.delete(studentId);
    //削除失敗時のエラー処理
    if (student === 0) {
      throw new NotFoundError();
    }
  }

  async searchStudents(data: StudentServerSearchInput): Promise<StudentSummary[]> {
    //大分類、中分類を小分類に変換
    const minorCategoryIds = await this.minorCategoryRepo.resolveMinorCategoryIds(data);

    const students = await this.studentRepo.search({
      minorCategoryIds,
      departmentIds: data.departmentIds,
      grades: data.grades,
    });

    return students.map(toStudentSummary);
  }
}
