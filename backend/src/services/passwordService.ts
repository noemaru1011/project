import bcrypt from 'bcrypt';
import { PasswordRepository } from '@/repositories/passwordRepository';

export const PasswordService = {
  async updatePassword(
    data: { oldPassword: string; newPassword: string; checkNewPassword: string },
    studentId: string,
  ) {
    const record = await PasswordRepository.findByStudentId(studentId);
    if (!record)
      throw {
        status: 404,
        code: 'STUDENT_NOT_FOUND',
        message: '学生が見つかりません',
      };

    const isMatch = await bcrypt.compare(data.oldPassword, record.password);
    if (!isMatch)
      throw {
        status: 400,
        code: 'INVALID_OLD_PASSWORD',
        message: '現在のパスワードが違います',
      };

    const hashedPassword = await bcrypt.hash(data.checkNewPassword, 10);
    return PasswordRepository.updatePassword(studentId, hashedPassword);
  },
};
