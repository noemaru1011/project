import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '@/errors/authError';
import { jwtUtil } from '@/utils/jwt';
import { ROLE } from '@shared/role';
import type { LoginResponse } from '@/types/loginResponse';
import { isPasswordUpdateRequired } from '@/utils/isPasswordUpdateRequired';
import { StudentRepository } from '@/repositories/studentRepository';
import { AdminRepository } from '@/repositories/adminRepository';
import { PasswordRepository } from '@/repositories/passwordRepository';

export const LoginService = {
  async login(email: string, inputPassword: string): Promise<LoginResponse> {
    // 管理者判定
    const admin = await AdminRepository.findByEmail(email);
    if (admin) {
      const isMatch = await bcrypt.compare(inputPassword, admin.password);
      if (!isMatch) throw new InvalidCredentialsError();

      const token = jwtUtil.createToken(admin.adminId, ROLE.ADMIN);
      return { token, role: ROLE.ADMIN };
    }

    // 学生判定
    const student = await StudentRepository.findByEmail(email);
    if (!student) throw new InvalidCredentialsError();

    const studentPassword = await PasswordRepository.findByStudentId(student.studentId);
    if (!studentPassword) throw new InvalidCredentialsError();

    const isMatch = await bcrypt.compare(inputPassword, studentPassword.password);
    if (!isMatch) throw new InvalidCredentialsError();

    // パスワード変更が必要か
    const passwordUpdateRequired = isPasswordUpdateRequired(
      studentPassword.createdAt,
      studentPassword.updatedAt,
    );

    const token = jwtUtil.createToken(student.studentId, ROLE.STUDENT);
    return { token, role: ROLE.STUDENT, passwordUpdateRequired };
  },
};
