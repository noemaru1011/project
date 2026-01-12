import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { StudentRepository } from '@/repositories/studentRepository';
import { PasswordRepository } from '@/repositories/passwordRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { generatePassword } from '@/utils/common/generatePassword';
import { sendAccountEmail } from '@/utils/mail/sendAccountEmail';
import { ConflictError } from '@/errors/appError';
import { EmailDuplicateError } from '@/errors/studentError';
import type { StudentResponse, StudentSummary, StudentServerCreateInput, StudentServerUpdateInput, StudentServerSearchInput } from '@shared/models/student';

export const StudentService = {
  async getStudent(studentId: string): Promise<StudentResponse | null> {
    const student = await StudentRepository.find(studentId);
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
  },

  async createStudent(data: StudentServerCreateInput): Promise<StudentResponse> {
    try {
      //パスワード作成
      const plainPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      //学生マスタとパスワードテーブルに登録トランザクション
      const student = await prisma.$transaction(async (tx) => {
        const student = await StudentRepository.create(tx, data);
        await PasswordRepository.create(tx, {
          studentId: student.studentId,
          password: hashedPassword,
        });
        return student;
      });

      //メール送信
      await sendAccountEmail(data.email, plainPassword);
      //DTO
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
      //メールアドレス重複時のエラー
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
  },

  async updateStudent(studentId: string, data: StudentServerUpdateInput): Promise<StudentResponse> {
    const student = await StudentRepository.update(studentId, data);

    if (!student) throw new ConflictError();
    //DTO
    return {
      studentId: student.studentId,
      studentName: student.studentName,
      grade: student.grade.toString(),
      departmentId: student.departmentId.toString(),
      email: student.email,
      minorCategoryId: student.minorCategoryId.toString(),
      updatedAt: student.updatedAt.toISOString(),
    };
  },

  async deleteStudent(studentId: string) {
    await StudentRepository.delete(studentId);
  },

  async searchStudents(data: StudentServerSearchInput): Promise<StudentSummary[]> {
    const minorCategoryIds = await MinorCategoryRepository.resolveMinorCategoryIds(data);

    const students = await StudentRepository.searchStudents({
      minorCategoryIds,
      departmentIds: data.departmentIds,
      grades: data.grades,
    });
    //DTO
    return students.map((student) => ({
      studentId: student.studentId.toString(),
      studentName: student.studentName,
      grade: student.grade.toString(),
      departmentName: student.department.departmentName,
      minorCategoryName: student.minorCategory.minorCategoryName,
    }));
  },
};
