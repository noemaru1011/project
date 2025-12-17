import { Request, Response, NextFunction } from 'express';
import { LoginService } from '@/services/loginService';
import { APIMESSAGE } from '@shared/apiMessage';

export const LoginController = {
  async login(req: Request, res: Response, next: NextFunction) {
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

      return res.status(200).json({ message: APIMESSAGE.LOGIN_SUCCESS, data: result });
    } catch (error) {
      return next(error);
    }
  },
};
