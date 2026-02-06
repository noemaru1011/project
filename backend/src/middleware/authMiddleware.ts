import { Request, Response, NextFunction } from 'express';
import { InvalidCredentialsError, ForbiddenError, TokenError } from '@/errors/authError';
import { Role } from '@shared/models/common';
import { JwtPayload } from '@/types/JwtPayload';
import { tokenBlacklist } from '@/utils/tokenBlacklist';
import * as jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new TokenError());
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // ブラックリストチェック
    if (await tokenBlacklist.isBlacklisted(token)) {
      return next(new TokenError());
    }

    req.user = payload;
    return next();
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

    return next();
  };
};
