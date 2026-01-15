import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from '@/errors/authError';
import { jwtUtil } from '@/utils/auth/jwt';
import { ROLE } from '@shared/models/common';
import { isPasswordUpdateRequired } from '@/utils/auth/isPasswordUpdateRequired';
import { StudentRepository } from '@/repositories/studentRepository';
import { AdminRepository } from '@/repositories/adminRepository';
import { PasswordRepository } from '@/repositories/passwordRepository';

export class LoginService {
  constructor(
    private adminRepo: AdminRepository,
    private studentRepo: StudentRepository,
    private passwordRepo: PasswordRepository,
  ) {}

  async login(email: string, inputPassword: string) {
    const [admin, student] = await Promise.all([
      this.adminRepo.findByEmail(email),
      this.studentRepo.findByEmail(email),
    ]);

    const DUMMY_HASH = '$2b$10$dummyhashtopreventtimingattacks000000000000000';

    if (admin) {
      const isMatch = await bcrypt.compare(inputPassword, admin.password);
      if (!isMatch) throw new InvalidCredentialsError();

      const token = jwtUtil.createToken(admin.adminId, ROLE.ADMIN);
      return { token, role: ROLE.ADMIN };
    }

    let studentPasswordHash = DUMMY_HASH;
    let studentPasswordData: any = null;

    if (student) {
      studentPasswordData = await this.passwordRepo.findByStudentId(student.studentId);
      if (studentPasswordData) studentPasswordHash = studentPasswordData.password;
    }

    const isMatch = await bcrypt.compare(inputPassword, studentPasswordHash);

    if (!isMatch || !student) throw new InvalidCredentialsError();

    const passwordUpdateRequired = isPasswordUpdateRequired(
      studentPasswordData!.createdAt,
      studentPasswordData!.updatedAt,
    );

    const token = jwtUtil.createToken(student.studentId, ROLE.STUDENT);
    return { token, role: ROLE.STUDENT, passwordUpdateRequired };
  }
}
