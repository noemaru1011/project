import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger';

// エラーログ
export const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.id ?? 'anonymous';
  const msg = `${req.method} ${req.originalUrl} | user:${userId} | msg:${err.message} | stack:${err.stack}`;

  // 非同期で書き込み、失敗しても処理を止めない
  Promise.resolve(logger.error(msg)).catch(console.error);

  next(err);
};
