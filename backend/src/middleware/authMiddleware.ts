import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('authMiddleware:', req.method, req.originalUrl);
  const token = req.cookies.token;

  if (!token) {
    console.log('No token found');
    return res.status(401).json({
      code: 'TOKEN_EXPIRED',
      message: 'ログインしてください',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = payload; // { id, role }
    console.log('Token verified, user:', payload);
    next();
  } catch {
    console.log('Token verification failed');
    return res.status(401).json({
      code: 'INVALID_TOKEN',
      message: '無効なトークンです',
    });
  }
};

// 権限チェック
export const requireRole = (role: 'ADMIN' | 'STUDENT') => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('requireRole:', role, 'for', req.method, req.originalUrl);
    const user = (req as any).user;
    if (!user) {
      console.log('No user found');
      return res.status(401).json({
        code: 'TOKEN_EXPIRED',
        message: 'ログインしてください',
      });
    }

    console.log('User role:', user.role, 'Required:', role);
    if (user.role !== role) {
      console.log('Role mismatch');
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: '権限がありません',
      });
    }

    console.log('Role check passed');
    next();
  };
};
