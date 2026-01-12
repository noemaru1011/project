import { Request, Response, NextFunction } from 'express';
import { appError } from '@/errors/appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
import { logger } from '@/utils/log/logger';

export const errorLogger = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const userId = req.user?.id ?? 'anonymous';

  if (err instanceof appError) {
    const msg = [
      req.method,
      req.originalUrl,
      `status:${err.status}`,
      `user:${userId}`,
      `msg:${err.message}`,
      `stack:${err.stack}`,
    ].join(' | ');

    Promise.resolve(logger.error(msg)).catch(console.error);

    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }

  if (err instanceof Error) {
    const msg = [
      req.method,
      req.originalUrl,
      `status:500`,
      `user:${userId}`,
      `msg:${err.message}`,
      `stack:${err.stack}`,
    ].join(' | ');

    Promise.resolve(logger.error(msg)).catch(console.error);
  }

  const key: ApiMessageCode = 'INTERNAL_SERVER_ERROR';
  return res.status(500).json({
    code: key,
    message: APIMESSAGE.INTERNAL_SERVER_ERROR,
  });
};
