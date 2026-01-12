import { Request, Response, NextFunction } from 'express';
import { LoginService } from '@/services/loginService';
import type { ApiBody } from '@shared/models/common';
import type { LoginResponse } from '@shared/models/auth';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
export const LoginController = {
  async login(req: Request, res: Response<ApiBody<LoginResponse>>, next: NextFunction) {
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

      const key: ApiMessageCode = 'LOGIN_SUCCESS';
      return res.status(200).json({ code: key, data: result, message: APIMESSAGE.LOGIN_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
