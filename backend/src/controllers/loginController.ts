import { Request, Response } from "express";
import { LoginService } from "@/services/loginService";
import { AppError } from "@/errors/AppError";

export const LoginController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      console.log(req.body);
      const result = await LoginService.login(email, password);
      console.log(result);

      // Cookie に JWT をセット
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600 * 1000,
      });

      // UX 用 role cookie
      res.cookie("role", result.role, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600 * 1000,
      });

      res.json({ code: "SUCCESS", message: "ログイン成功", ...result });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.status).json({
          code: err.code,
          message: err.message,
        });
      }

      // 予期しないエラー
      return res.status(500).json({
        code: "INTERNAL_ERROR",
        message: "予期せぬエラーが発生しました",
      });
    }
  },
};
