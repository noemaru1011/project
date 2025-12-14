import bcrypt from 'bcrypt';
import { PasswordRepository } from '@/repositories/passwordRepository';
import { NoStudentError } from '@/errors/studentError';
import { NotMatchPasswordError } from '@/errors/passwordError';

export const PasswordService = {
  async updatePassword(
    data: { oldPassword: string; newPassword: string; checkNewPassword: string },
    studentId: string,
  ) {
    //cookieの値
    const stundet = await PasswordRepository.findByStudentId(studentId);
    if (!stundet) throw new NoStudentError();

    const isMatch = await bcrypt.compare(data.oldPassword, stundet.password);
    if (!isMatch) throw new NotMatchPasswordError();

    const hashedPassword = await bcrypt.hash(data.checkNewPassword, 10);
    return PasswordRepository.updatePassword(studentId, hashedPassword);
  },
};
