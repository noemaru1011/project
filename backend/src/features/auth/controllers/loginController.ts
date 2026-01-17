import { Request, Response, NextFunction } from 'express';
import { LoginService } from '@/features/auth/services/loginService';
import type { ApiBody } from '@shared/models/common';
import type { LoginResponse } from '@shared/models/auth';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  login = async (req: Request, res: Response<ApiBody<LoginResponse>>, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const result = await this.loginService.login(email, password);

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 1000,
      });

      res.cookie('role', result.role, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 1000,
      });

      res.cookie('csrf', crypto.randomUUID(), { httpOnly: false });

      return res
        .status(200)
        .json({ code: 'LOGIN_SUCCESS', data: result, message: APIMESSAGE.LOGIN_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };
}
