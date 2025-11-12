import { Request, Response } from "express";
import { LoginService } from "@/services/loginService";

export const LoginController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await LoginService.login(email, password);

      // Cookie に JWT をセット
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600 * 1000, // 1時間
      });

      res.json({ code: "SUCCESS", message: "ログイン成功", role: result.role });
    } catch (err: any) {
      const code = err.code || "INTERNAL_ERROR";
      const message = err.message || "予期せぬエラーが発生しました";
      res
        .status(code === "INVALID_CREDENTIALS" ? 401 : 500)
        .json({ code, message });
    }
  },
};
