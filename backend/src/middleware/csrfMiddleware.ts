import { Request, Response, NextFunction } from 'express';
import { CsrfError } from '@/errors/csrfError';

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

export const csrfMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  if (SAFE_METHODS.includes(req.method)) {
    return next();
  }

  const cookieToken = req.cookies?.csrf;
  const headerToken = req.headers['x-csrf-token'];

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return next(new CsrfError());
  }

  next();
};
