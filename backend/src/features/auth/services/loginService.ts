import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '@/errors';
import { jwtUtil } from '@/features/auth/utils/jwt';
import { ROLE } from '@shared/models/common';
import { isPasswordUpdateRequired } from '@/features/auth/utils/isPasswordUpdateRequired';
import { StudentRepository } from '@/features/student/repositories/studentRepository';
import { AdminRepository } from '@/features/auth/repositories/adminRepository';
import { PasswordRepository } from '@/features/auth/repositories/passwordRepository';

export class LoginService {
  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly studentRepo: StudentRepository,
    private readonly passwordRepo: PasswordRepository,
  ) {}

  async login(email: string, inputPassword: string) {
    const [admin, student] = await Promise.all([
      this.adminRepo.findByEmail(email),
      this.studentRepo.findByEmail(email),
    ]);

    // 1. 管理者ログイン
    if (admin) {
      const isMatch = await bcrypt.compare(inputPassword, admin.password);
      if (!isMatch) throw new InvalidCredentialsError();

      const token = jwtUtil.createToken(admin.adminId, ROLE.ADMIN);
      return { token, role: ROLE.ADMIN };
    }

    // 2. 学生ログインの準備
    const DUMMY_HASH = '$2b$10$dummyhashtopreventtimingattacks000000000000000';

    // リポジトリから直接型を抽出
    let studentPasswordData: Awaited<ReturnType<typeof this.passwordRepo.findByStudentId>> = null;

    if (student) {
      studentPasswordData = await this.passwordRepo.findByStudentId(student.studentId);
    }

    // パスワード比較（studentがいなくても、データがなくてもDUMMY_HASHを使う）
    const studentPasswordHash = studentPasswordData?.password ?? DUMMY_HASH;
    const isMatch = await bcrypt.compare(inputPassword, studentPasswordHash);

    if (!isMatch || !student || !studentPasswordData) {
      throw new InvalidCredentialsError();
    }

    // パスワード変更を推奨するフラグをセット
    const passwordUpdateRequired = isPasswordUpdateRequired(
      studentPasswordData.createdAt,
      studentPasswordData.updatedAt,
    );

    const token = jwtUtil.createToken(student.studentId, ROLE.STUDENT);
    return { token, role: ROLE.STUDENT, passwordUpdateRequired };
  }
}
