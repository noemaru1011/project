import { Request, Response, NextFunction } from 'express';
import { PasswordService } from '@/services/passwordService';
import { APIMESSAGE } from '@/constants/APIMESSAGE';
import { TokenError } from '@/errors/authError';

export const PasswordController = {
  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      //cookieのidからstudentIdを特定
      if (!req.user) return next(new TokenError());
      await PasswordService.updatePassword(req.body, req.user.id);
      res.status(200).json({ message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
