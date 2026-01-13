import bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';
import { StudentRepository } from '@/repositories/studentRepository';
import { PasswordRepository } from '@/repositories/passwordRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { generatePassword } from '@/utils/common/generatePassword';
import { sendAccountEmail } from '@/utils/mail/sendAccountEmail';
import { ConflictError } from '@/errors/appError';
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
    private prisma: PrismaClient,
    private studentRepo: StudentRepository,
    private passwordRepo: PasswordRepository,
    private minorCategoryRepo: MinorCategoryRepository,
    private mailer: typeof sendAccountEmail,
    private passwordGenerator: typeof generatePassword
  ) {}

  async getStudent(studentId: string): Promise<StudentResponse | null> {
    const student = await this.studentRepo.find(studentId);
    if (student == null) return null;
    return {
      studentId: student.studentId,
      studentName: student.studentName,
      grade: student.grade.toString(),
      departmentId: student.departmentId.toString(),
      email: student.email,
      minorCategoryId: student.minorCategoryId.toString(),
      updatedAt: student.updatedAt.toISOString(),
    };
  }

  async createStudent(data: StudentServerCreateInput): Promise<StudentResponse> {
    try {
      //パスワード作成
      const plainPassword = this.passwordGenerator();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      //トランザクション内での登録
      const student = await this.prisma.$transaction(async (tx) => {
        // withTransaction を使って、その場でトランザクション用のリポジトリを取得
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
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          err.code === 'P2002' &&
          Array.isArray(err.meta?.target) &&
          err.meta.target.includes('email')
        ) {
          throw new EmailDuplicateError();
        }
      }
      throw err;
    }
  }

  async updateStudent(studentId: string, data: StudentServerUpdateInput): Promise<StudentResponse> {
    const student = await this.studentRepo.update(studentId, data);

    if (!student) throw new ConflictError();

    return {
      studentId: student.studentId,
      studentName: student.studentName,
      grade: student.grade.toString(),
      departmentId: student.departmentId.toString(),
      email: student.email,
      minorCategoryId: student.minorCategoryId.toString(),
      updatedAt: student.updatedAt.toISOString(),
    };
  }

  async deleteStudent(studentId: string) {
    await this.studentRepo.delete(studentId);
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
