import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { StudentRepository } from '@/repositories/studentRepository';
import { PasswordRepository } from '@/repositories/passwordRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { generatePassword } from '@/utils/generatePassword';
import { sendAccountEmail } from '@/utils/sendAccountEmail';
import { ConflictError } from '@/errors/appError';
import { EmailDuplicateError } from '@/errors/studentError';

export const StudentService = {
  async getStudent(studentId: string) {
    return await StudentRepository.find(studentId);
  },

  async createStudent(data: {
    studentName: string;
    email: string;
    departmentId: number;
    minorCategoryId: number;
    grade: number;
  }) {
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
      return student;
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

  async updateStudent(
    studentId: string,
    data: {
      studentName: string;
      departmentId: number;
      minorCategoryId: number;
      grade: number;
      updatedAt: Date;
    },
  ) {
    const student = await StudentRepository.update(studentId, data);
    //楽観的エラー
    if (student.count === 0) throw new ConflictError();
    return student;
  },

  async deleteStudent(studentId: string) {
    await StudentRepository.delete(studentId);
  },

  async searchStudents(data: {
    minorCategoryId?: number[];
    subCategoryId?: number[];
    categoryId?: number[];
    grade?: number[];
    departmentId?: number[];
  }) {
    const minorCategoryIds = await MinorCategoryRepository.resolveMinorCategoryIds(data);

    const students = await StudentRepository.searchStudents({
      minorCategoryIds,
      departments: data.departmentId,
      grade: data.grade,
    });

    //DTO
    return students.map((s) => ({
      studentId: s.studentId,
      studentName: s.studentName,
      grade: s.grade,
      departmentName: s.department?.departmentName ?? null,
      minorCategoryName: s.minorCategory?.minorCategoryName ?? null,
    }));
  },
};
