import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginRepository } from "@/repositories/loginRepository";

const JWT_SECRET = process.env.JWT_SECRET!;

interface LoginResult {
  token: string;
  role: "ADMIN" | "STUDENT";
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

      const token = jwt.sign({ id: admin.adminId, role: "ADMIN" }, JWT_SECRET, {
        expiresIn: "1h",
      });
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

    const token = jwt.sign(
      { id: student.studentId, role: "STUDENT" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { token, role: "STUDENT" };
  },
};
