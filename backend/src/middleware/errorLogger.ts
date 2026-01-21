import { Request, Response, NextFunction } from 'express';
import { appError } from '@/errors/appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import { logger } from '@/utils/log/logger';

export const errorLogger = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const userId = req.user?.id ?? 'anonymous';

  // ログ用データの共通化
  const logDetails = {
    method: req.method,
    url: req.originalUrl,
    userId,
    stack: err instanceof Error ? err.stack : undefined,
  };

  if (err instanceof appError) {
    logger.error(err.message, {
      ...logDetails,
      status: err.status,
      code: err.code,
    });

    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }

  // 予期せぬエラー
  const message = err instanceof Error ? err.message : String(err);
  logger.error(message, { ...logDetails, status: 500 });

  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: APIMESSAGE.INTERNAL_SERVER_ERROR,
  });
};
