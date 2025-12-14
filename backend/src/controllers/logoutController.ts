import { Request, Response } from 'express';
import { handleError } from '@/utils/handleError';
import { apiMessage } from '@/constants/apiMessage';

export const LogoutController = {
  logout(req: Request, res: Response) {
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

      return res.status(200).json({ message: apiMessage.LOGOUT_SUCCESS });
    } catch (error: any) {
      return handleError(error, res);
    }
  },
};
