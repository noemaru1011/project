import { Request, Response, NextFunction } from 'express';
import { PasswordService } from '@/features/auth/services/passwordService';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import { ApiBody } from '@shared/models/common';
import { TokenError } from '@/errors/authError';

export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  updatePassword = async (req: Request, res: Response<ApiBody<null>>, next: NextFunction) => {
    try {
      if (!req.user) return next(new TokenError());
      await this.passwordService.updatePassword(req.body, req.user.id);

      res
        .status(200)
        .json({ code: 'UPDATE_SUCCESS', data: null, message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };
}
