import { Request, Response } from 'express';
import { appError } from '@/errors/appError';
import { apiMessage } from '@/constants/apiMessage';
import { logger } from '@/utils/logger';

export const errorLogger = (err: unknown, req: Request, res: Response) => {
  const userId = req.user?.id ?? 'anonymous';

  if (err instanceof appError) {
    // ログ出力
    const msg = `${req.method} ${req.originalUrl} | user:${userId} | msg:${err.message} | stack:${err.stack}`;
    Promise.resolve(logger.error(msg)).catch(console.error);

    // レスポンス返却
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }
  //その他の例外的なエラー
  const msg = `${req.method} ${req.originalUrl} | user:${userId} | unexpected error: ${JSON.stringify(err)}`;
  Promise.resolve(logger.error(msg)).catch(console.error);

  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: apiMessage.INTERNAL_SERVER_ERROR,
  });
};
