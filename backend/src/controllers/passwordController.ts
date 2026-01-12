import { Request, Response, NextFunction } from 'express';
import { PasswordService } from '@/services/passwordService';
import { APIMESSAGE } from '@shared/apiMessage';
import { Apibody } from '@/types/apiBody';
import type { ApiMessageCode } from '@shared/apiMessage';
import { TokenError } from '@/errors/authError';

export const PasswordController = {
  async updatePassword(req: Request, res: Response<Apibody<null>>, next: NextFunction) {
    try {
      //cookieのidからstudentIdを特定
      if (!req.user) return next(new TokenError());
      await PasswordService.updatePassword(req.body, req.user.id);
      const key: ApiMessageCode = 'UPDATE_SUCCESS';
      //パスワードはRESTfulでもresponseに含めない
      res.status(200).json({ code: key, data: null, message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
