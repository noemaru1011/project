import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { UpdateResult } from '@/types/UpdateResult';
import { StudentRepository } from '@/features/student/repositories/studentRepository';
import { PasswordRepository } from '@/features/auth/repositories/passwordRepository';
import { MinorCategoryRepository } from '@/features/minorCategory/repositories/minorCategoryRepository';
import { generatePassword } from '@/utils/common/generatePassword';
import { sendAccountEmail } from '@/utils/mail/sendAccountEmail';
import { OptimisticLockError, InvalidReferenceError, NotFoundError } from '@/errors/appError';
import { EmailDuplicateError } from '@/errors/studentError';
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

  async getStudent(studentId: string): Promise<StudentResponse | null> {
    const student = await this.studentRepo.findById(studentId);
    if (student == null) return null;
    return {
      studentId: student.studentId,
      studentName: student.studentName,
      grade: student.grade.toString(),
      departmentId: student.departmentId.toString(),
      email: student.email,
      minorCategoryId: student.minorCategoryId.toString(),
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
    };
  }

  async createStudent(data: StudentServerCreateInput): Promise<StudentResponse> {
    try {
      //パスワード作成
      const plainPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      //トランザクション内での登録
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

      return {
        studentId: student.studentId,
        studentName: student.studentName,
        grade: student.grade.toString(),
        departmentId: student.departmentId.toString(),
        email: student.email,
        minorCategoryId: student.minorCategoryId.toString(),
        createdAt: student.createdAt.toISOString(),
        updatedAt: student.updatedAt.toISOString(),
      };
    } catch (err: any) {
      if (
        err.code === 'P2002' &&
        Array.isArray(err.meta?.target) &&
        err.meta.target.includes('email')
      ) {
        throw new EmailDuplicateError();
      }
      if (err.code === 'P2003') {
        throw new InvalidReferenceError();
      }
      throw err;
    }
  }

  async updateStudent(studentId: string, data: StudentServerUpdateInput): Promise<StudentResponse> {
    try {
      const student = await this.studentRepo.update(studentId, data);

      if (student == UpdateResult.NOT_FOUND) throw new NotFoundError();
      if (student == UpdateResult.OPTIMISTIC_LOCK) throw new OptimisticLockError();

      return {
        studentId: student.studentId,
        studentName: student.studentName,
        grade: student.grade.toString(),
        departmentId: student.departmentId.toString(),
        email: student.email,
        minorCategoryId: student.minorCategoryId.toString(),
        createdAt: student.createdAt.toISOString(),
        updatedAt: student.updatedAt.toISOString(),
      };
    } catch (err: any) {
      if (err.code === 'P2003') {
        throw new InvalidReferenceError();
      }
      throw err;
    }
  }

  async deleteStudent(studentId: string) {
    const deleted = await this.studentRepo.delete(studentId);
    if (deleted === 0) {
      throw new NotFoundError();
    }
  }

  async searchStudents(data: StudentServerSearchInput): Promise<StudentSummary[]> {
    const minorCategoryIds = await this.minorCategoryRepo.resolveMinorCategoryIds(data);

    const students = await this.studentRepo.searchStudents({
      minorCategoryIds,
      departmentIds: data.departmentIds,
      grades: data.grades,
    });

    return students.map((student) => ({
      studentId: student.studentId.toString(),
      studentName: student.studentName,
      grade: student.grade.toString(),
      departmentName: student.department.departmentName,
      minorCategoryName: student.minorCategory.minorCategoryName,
    }));
  }
}
