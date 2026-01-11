import { Request, Response, NextFunction } from 'express';
import { PasswordService } from '@/services/passwordService';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';
import { TokenError } from '@/errors/authError';

export const PasswordController = {
  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      //cookieのidからstudentIdを特定
      if (!req.user) return next(new TokenError());
      await PasswordService.updatePassword(req.body, req.user.id);
      const key: ApiMessageKey = 'UPDATE_SUCCESS';
      res.status(200).json({ code: key, message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
