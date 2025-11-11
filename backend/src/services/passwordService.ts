import bcrypt from "bcrypt";
import { PasswordRepository } from "@/repositories/passwordRepository";

export const PasswordService = {
  async updatePassword(
    data: { oldPassword: string; newPassword: string },
    studentId: string
  ) {
    const record = await PasswordRepository.findByStudentId(studentId);
    if (!record) throw new Error("Student not found");

    const isMatch = await bcrypt.compare(data.oldPassword, record.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    return PasswordRepository.updatePassword(studentId, hashedPassword);
  },
};
