import { Response } from 'express';
import { appError } from '@/errors/appError';

export function handleError(err: any, res: Response) {
  if (err instanceof appError) {
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }

  //その他のエラー
  return res.status(500).json({
    message: '予期せぬエラーが発生しました',
  });
}
