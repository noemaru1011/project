import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "@/errors/AuthError";
import { JwtUtil } from "@/utils/jwt";
import { isPasswordUpdateRequired } from "@/utils/isPasswordUpdateRequired";
import { LoginRepository } from "@/repositories/loginRepository";

interface LoginResult {
  token: string;
  role: "ADMIN" | "STUDENT";
  passwordUpdateRequired?: boolean;
}

export const LoginService = {
  async login(email: string, password: string): Promise<LoginResult> {
    // 管理者判定
    const admin = await LoginRepository.findAdmin(email);
    if (admin) {
      const match = await bcrypt.compare(password, admin.password);
      if (!match) throw new InvalidCredentialsError();

      const token = JwtUtil.createToken(admin.adminId, "ADMIN");
      return { token, role: "ADMIN" };
    }

    // 学生判定
    const student = await LoginRepository.findStudent(email);
    if (!student) throw new InvalidCredentialsError();

    const studentPassword = await LoginRepository.getStudentPassword(
      student.studentId
    );
    if (!studentPassword) throw new InvalidCredentialsError();

    const match = await bcrypt.compare(password, studentPassword.password);
    if (!match) throw new InvalidCredentialsError();

    // パスワード変更が必要か
    const passwordUpdateRequired = isPasswordUpdateRequired(
      studentPassword.createdAt,
      studentPassword.updatedAt
    );

    const token = JwtUtil.createToken(student.studentId, "STUDENT");
    return { token, role: "STUDENT", passwordUpdateRequired };
  },
};
