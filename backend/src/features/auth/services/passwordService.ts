import bcrypt from 'bcrypt';
import { PasswordRepository } from '@/features/auth/repositories/passwordRepository';
import { NoStudentError } from '@/errors/studentError';
import { NotMatchPasswordError } from '@/errors/passwordError';
import type { PasswordUpdateInput } from '@shared/models/auth';

export class PasswordService {
  constructor(private readonly passwordRepo: PasswordRepository) {}

  async updatePassword(data: PasswordUpdateInput, studentId: string) {
    const student = await this.passwordRepo.findByStudentId(studentId);
    if (!student) throw new NoStudentError();

    const isMatch = await bcrypt.compare(data.oldPassword, student.password);
    if (!isMatch) throw new NotMatchPasswordError();

    const hashedPassword = await bcrypt.hash(data.checkNewPassword, 10);
    return this.passwordRepo.update(studentId, hashedPassword);
  }
}
