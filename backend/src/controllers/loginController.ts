import { Request, Response, NextFunction } from 'express';
import { LoginService } from '@/services/loginService';
import type { Apibody } from '@/types/apiBody';
import type { Login } from '@shared/types/login';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export const LoginController = {
  async login(req: Request, res: Response<Apibody<Login>>, next: NextFunction) {
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

      // csrf用
      res.cookie('csrf', crypto.randomUUID(), { httpOnly: false });

      const key: ApiMessageKey = 'LOGIN_SUCCESS';
      return res.status(200).json({ code: key, data: result, message: APIMESSAGE.LOGIN_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
