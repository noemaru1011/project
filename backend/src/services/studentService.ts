import { Request, Response } from "express";
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
};
