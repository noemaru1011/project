import { Request, Response } from 'express';
import { PasswordService } from '@/services/passwordService';
import { handleError } from '@/utils/handleError';
import { apiMessage } from '@/constants/apiMessage';

export const PasswordController = {
  async updatePassword(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      await PasswordService.updatePassword(req.body, user.id);
      res.status(200).json({ message: apiMessage.UPDATE_SUCCESS });
    } catch (error: any) {
      return handleError(error, res);
    }
  },
};
