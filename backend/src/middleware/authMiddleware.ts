import { Request, Response, NextFunction } from 'express';
import { InvalidCredentialsError, ForbiddenError, TokenError } from '@/errors/authError';
import { Role } from '@/types/role';
import { JwtPayload } from '@/types/jwtPayload';
import jwt from 'jsonwebtoken';

//パスワード変更時にトークン消すといいかもね
export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new TokenError());
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    return next(new TokenError());
  }
};

// 権限チェック
export const requireRole = (roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new InvalidCredentialsError());
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError());
    }

    next();
  };
};
