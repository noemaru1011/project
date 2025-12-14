import { Request, Response, NextFunction } from 'express';
import { APIMESSAGE } from '@/constants/apiMessage';

export const LogoutController = {
  logout(_req: Request, res: Response, next: NextFunction) {
    try {
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

      return res.status(200).json({ message: APIMESSAGE.LOGOUT_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
