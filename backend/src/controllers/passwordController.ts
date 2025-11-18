import { Request, Response } from 'express';
import { PasswordService } from '@/services/passwordService';

export const PasswordController = {
  async updatePassword(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      await PasswordService.updatePassword(req.body, user.id);
      res.status(200).json({ message: 'パスワードを更新しました' });
    } catch (err: any) {
      console.error(err);

      if (err.status) {
        return res.status(err.status).json({
          code: err.code,
          message: err.message,
        });
      }

      res.status(500).json({
        message: '予期せぬエラーが発生しました',
      });
    }
  },
};
