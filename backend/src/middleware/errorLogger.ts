import { Request, Response, NextFunction } from 'express';
import { appError } from '@/errors/appError';
import { APIMESSAGE } from '@/constants/apiMessage';
import type { ApiMessageKey } from '@/constants/apiMessage';
import { logger } from '@/utils/logger';

export const errorLogger = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const userId = req.user?.id ?? 'anonymous';

  if (err instanceof appError) {
    const msg = `${req.method} ${req.originalUrl} | user:${userId} | msg:${err.message} | stack:${err.stack}`;
    Promise.resolve(logger.error(msg)).catch(console.error);

    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }

  const msg = `${req.method} ${req.originalUrl} | user:${userId} | unexpected error: ${JSON.stringify(err)}`;
  Promise.resolve(logger.error(msg)).catch(console.error);

  const key: ApiMessageKey = 'INTERNAL_SERVER_ERROR';
  return res.status(500).json({
    code: key,
    message: APIMESSAGE.INTERNAL_SERVER_ERROR,
  });
};
