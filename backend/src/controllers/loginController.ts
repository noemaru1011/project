import { Request, Response } from 'express';
import { LoginService } from '@/services/loginService';
import { AppError } from '@/errors/AppError';

export const LoginController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await LoginService.login(email, password);

      // Cookie に JWT をセット
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 1000,
      });

      // UXのためだけの role cookie、APIの認証には使わないです
      res.cookie('role', result.role, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 1000,
      });

      res.json({ code: 'SUCCESS', message: 'ログイン成功', data: result });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.status).json({
          code: err.code,
          message: err.message,
        });
      }

      // 予期しないエラー
      return res.status(500).json({
        message: '予期せぬエラーが発生しました',
      });
    }
  },
};
