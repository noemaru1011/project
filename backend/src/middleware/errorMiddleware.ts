import { Request, Response, NextFunction } from 'express';
import { appError } from '@/errors/appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof appError) {
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }

  // 予期せぬエラー
  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: APIMESSAGE.INTERNAL_SERVER_ERROR,
  });
};
