import { Request, Response, NextFunction } from 'express';
import { PasswordService } from '@/services/passwordService';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import { ApiBody } from '@shared/models/common';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
import { TokenError } from '@/errors/authError';

export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  updatePassword = async (req: Request, res: Response<ApiBody<null>>, next: NextFunction) => {
    try {
      if (!req.user) return next(new TokenError());
      await this.passwordService.updatePassword(req.body, req.user.id);
      const key: ApiMessageCode = 'UPDATE_SUCCESS';
      res.status(200).json({ code: key, data: null, message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };
}
