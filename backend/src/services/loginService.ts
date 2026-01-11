import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '@/errors/authError';
import { jwtUtil } from '@/utils/jwt';
import { ROLE } from '@shared/types/role';
import { isPasswordUpdateRequired } from '@/utils/isPasswordUpdateRequired';
import { StudentRepository } from '@/repositories/studentRepository';
import { AdminRepository } from '@/repositories/adminRepository';
import { PasswordRepository } from '@/repositories/passwordRepository';

export const LoginService = {
  async login(email: string, inputPassword: string) {
    // 管理者と学生の検索を同時に
    const [admin, student] = await Promise.all([
      AdminRepository.findByEmail(email),
      StudentRepository.findByEmail(email),
    ]);

    // ダミーハッシュ（存在しない場合でも bcrypt.compare する）
    const DUMMY_HASH = '$2b$10$dummyhashtopreventtimingattacks000000000000000';

    // 管理者判定
    if (admin) {
      const isMatch = await bcrypt.compare(inputPassword, admin.password);
      if (!isMatch) throw new InvalidCredentialsError();

      const token = jwtUtil.createToken(admin.adminId, ROLE.ADMIN);
      return { token, role: ROLE.ADMIN };
    }

    // 学生判定
    let studentPasswordHash = DUMMY_HASH;
    if (student) {
      const studentPassword = await PasswordRepository.findByStudentId(student.studentId);
      if (studentPassword) studentPasswordHash = studentPassword.password;
    }

    const isMatch = await bcrypt.compare(inputPassword, studentPasswordHash);

    // マッチしなければ必ずエラー
    if (!isMatch || !student) throw new InvalidCredentialsError();

    const studentPassword = await PasswordRepository.findByStudentId(student.studentId);

    // パスワード変更判定
    const passwordUpdateRequired = isPasswordUpdateRequired(
      studentPassword!.createdAt,
      studentPassword!.updatedAt,
    );

    const token = jwtUtil.createToken(student!.studentId, ROLE.STUDENT);
    return { token, role: ROLE.STUDENT, passwordUpdateRequired };
  },
};
