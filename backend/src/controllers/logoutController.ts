import { Request, Response, NextFunction } from 'express';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageCode } from '@shared/apiMessage';
import { tokenBlacklist } from '@/utils/tokenBlacklist';
import type { Apibody } from '@/types/apiBody';
import jwt from 'jsonwebtoken';

export const LogoutController = {
  async logout(req: Request, res: Response<Apibody<null>>, next: NextFunction) {
    try {
      const token = req.cookies.token;

      if (token) {
        // トークンをデコードして有効期限(exp)を取得
        const decoded = jwt.decode(token) as { exp?: number };

        if (decoded?.exp) {
          const now = Math.floor(Date.now() / 1000);
          const expiresIn = decoded.exp - now;

          if (expiresIn > 0) {
            // Redisのブラックリストに追加
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
  },
};
