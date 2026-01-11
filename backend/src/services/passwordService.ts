import bcrypt from 'bcrypt';
import { PasswordRepository } from '@/repositories/passwordRepository';
import { NoStudentError } from '@/errors/studentError';
import { NotMatchPasswordError } from '@/errors/passwordError';
import type { PasswordForm } from '@shared/schemas/password';

export const PasswordService = {
  async updatePassword(data: PasswordForm, studentId: string) {
    //cookieの値
    const stundet = await PasswordRepository.findByStudentId(studentId);
    if (!stundet) throw new NoStudentError();

    const isMatch = await bcrypt.compare(data.oldPassword, stundet.password);
    if (!isMatch) throw new NotMatchPasswordError();

    const hashedPassword = await bcrypt.hash(data.checkNewPassword, 10);
    return PasswordRepository.update(studentId, hashedPassword);
  },
};
