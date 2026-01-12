import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/log/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint(); // 高精度タイマー
  const userId = req.user?.id ?? 'anonymous';

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000;

    const msg = [
      req.method,
      req.originalUrl,
      `status:${res.statusCode}`,
      `user:${userId}`,
      `time:${durationMs.toFixed(2)}ms`,
    ].join(' | ');

    Promise.resolve(logger.info(msg)).catch(console.error);
  });

  next();
};
