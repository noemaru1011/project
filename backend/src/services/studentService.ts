import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { StudentRepository } from '@/repositories/studentRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { generatePassword } from '@/utils/generatePassword';
import { sendAccountEmail } from '@/utils/sendAccountEmail';
import { AppError } from '@/errors/AppError';

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
      const plainPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      await StudentRepository.createStudent({
        ...data,
        password: hashedPassword,
      });

      await sendAccountEmail(data.email, plainPassword);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          err.code === 'P2002' &&
          Array.isArray(err.meta?.target) &&
          err.meta.target.includes('email')
        ) {
          throw new AppError('EMAIL_DUPLICATE', 'このメールアドレスはすでに登録されています', 400);
        }
      }
      throw err;
    }
  },

  async updateStudent(
    data: {
      studentName: string;
      departmentId: number;
      minorCategoryId: number;
      grade: number;
      updatedAt: Date;
    },
    studentId: string,
  ) {
    await StudentRepository.updateStudent(data, studentId);
  },

  async deleteStudent(studentId: string) {
    await StudentRepository.deleteStudent(studentId);
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

    return students.map((s) => ({
      studentId: s.studentId,
      studentName: s.studentName,
      grade: s.grade,
      departmentName: s.department?.departmentName ?? null,
      minorCategoryName: s.minorCategory?.minorCategoryName ?? null,
    }));
  },
};
