import bcrypt from "bcrypt";
import { JwtUtil } from "@/utils/jwt";
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
      if (!match)
        throw {
          code: "INVALID_CREDENTIALS",
          message: "メールアドレスかパスワードが違います",
        };

      const token = JwtUtil.createToken(admin.adminId, "ADMIN");
      return { token, role: "ADMIN" };
    }

    // 学生判定
    const student = await LoginRepository.findStudent(email);
    if (!student)
      throw {
        code: "INVALID_CREDENTIALS",
        message: "メールアドレスかパスワードが違います",
      };

    const studentPassword = await LoginRepository.getStudentPassword(
      student.studentId
    );
    if (!studentPassword)
      throw {
        code: "INVALID_CREDENTIALS",
        message: "メールアドレスかパスワードが違います",
      };

    const match = await bcrypt.compare(password, studentPassword.password);
    if (!match)
      throw {
        code: "INVALID_CREDENTIALS",
        message: "メールアドレスかパスワードが違います",
      };

    const now = new Date();
    const lastChanged = studentPassword.updatedAt;
    const minutesSinceUpdate =
      (now.getTime() - lastChanged.getTime()) / (1000 * 60);
    const passwordUpdateRequired =
      !studentPassword.defaultChangeFlag || minutesSinceUpdate > 1;

    const token = JwtUtil.createToken(student.studentId, "STUDENT");
    return { token, role: "STUDENT", passwordUpdateRequired };
  },
};
