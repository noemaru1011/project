import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      code: 'TOKEN_EXPIRED',
      message: 'ログインしてください',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = payload; // { id, role }
    next();
  } catch {
    return res.status(401).json({
      code: 'INVALID_TOKEN',
      message: '無効なトークンです',
    });
  }
};

// 🚀 完全版の権限チェック
export const requireRole = (role: 'ADMIN' | 'STUDENT') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user)
      return res.status(401).json({
        code: 'TOKEN_EXPIRED',
        message: 'ログインしてください',
      });

    if (user.role !== role) {
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: '権限がありません',
      });
    }

    next();
  };
};
