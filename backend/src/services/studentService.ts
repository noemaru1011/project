import bcrypt from "bcrypt";
import { StudentRepository } from "@/repositories/studentRepository";
import { generatePassword } from "@/utils/generatePassword";
import { sendAccountEmail } from "@/utils/sendAccountEmail";

export const StudentService = {
  async getAllStudents() {
    const students = await StudentRepository.findAll();
    return students;
  },

  async getStudent(studentId: string) {
    const student = await StudentRepository.find(studentId);
    return student;
  },

  async createStudent(data: {
    studentName: string;
    email: string;
    departmentId: number;
    minorCategoryId: number;
    grade: number;
  }) {
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    // 学生テーブルに登録
    const student = await StudentRepository.createStudent({
      ...data,
      password: hashedPassword,
    });
    // メール送信
    await sendAccountEmail(data.email, plainPassword);
    return student;
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
    const student = await StudentRepository.updateStudent(data, studentId);
    return student;
  },

  async deleteStudent(studentId: string) {
    const student = await StudentRepository.deleteStudent(studentId);
    return student;
  },

  async searchStudents(filters: {
    categories?: number[];
    subCategories?: number[];
    minorCategories?: number[];
    departments?: number[];
    grade?: number[];
  }) {
    // Repository に階層解決を完全に任せる

    const minorCategoryIds = await StudentRepository.resolveMinorCategoryIds(
      filters
    );

    const students = await StudentRepository.searchStudents({
      minorCategoryIds,
      departments: filters.departments,
      grade: filters.grade,
    });

    return students;
  },
};
