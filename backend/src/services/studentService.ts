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
import type { StudentServerForm, StudentUpdateServerForm } from '@shared/schemas/student';
import type { StudentQuerySeverForm } from '@shared/schemas/studentQuery';

export const StudentService = {
  async getStudent(studentId: string) {
    return await StudentRepository.find(studentId);
  },

  async createStudent(data: StudentServerForm) {
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

  async updateStudent(studentId: string, data: StudentUpdateServerForm) {
    const student = await StudentRepository.update(studentId, data);
    //楽観的エラー
    if (student === null) throw new ConflictError();
    return student;
  },

  async deleteStudent(studentId: string) {
    await StudentRepository.delete(studentId);
  },

  async searchStudents(data: StudentQuerySeverForm) {
    const minorCategoryIds = await MinorCategoryRepository.resolveMinorCategoryIds(data);

    return await StudentRepository.searchStudents({
      minorCategoryIds,
      departmentIds: data.departmentIds,
      grades: data.grades,
    });
  },
};
