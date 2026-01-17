import { Request, Response, NextFunction } from 'express';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
import { tokenBlacklist } from '@/utils/auth/tokenBlacklist';
import type { ApiBody } from '@shared/models/common';
import jwt from 'jsonwebtoken';

export class LogoutController {
  logout = async (req: Request, res: Response<ApiBody<null>>, next: NextFunction) => {
    try {
      const token = req.cookies.token;

      if (token) {
        // ここでは「署名検証済みトークン」である前提
        const decoded = jwt.decode(token) as { exp?: number } | null;

        if (decoded?.exp) {
          const now = Math.floor(Date.now() / 1000);
          const expiresIn = decoded.exp - now;

          if (expiresIn > 0) {
            await tokenBlacklist.add(token, expiresIn);
          }
        }
      }

      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.clearCookie('role', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.clearCookie('csrf', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      const key: ApiMessageCode = 'LOGOUT_SUCCESS';
      return res.status(200).json({ code: key, data: null, message: APIMESSAGE.LOGOUT_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };
}
