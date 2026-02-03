import { Request, Response, NextFunction, RequestHandler } from 'express';
import type { ApiBody } from '@shared/models/common';

export const asyncHandler = <T>(
  fn: (req: Request, res: Response<ApiBody<T>>, next: NextFunction) => Promise<any>,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res as Response<ApiBody<T>>, next)).catch(next);
  };
};
