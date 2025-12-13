import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//パスワード変更時にトークン消すといいかもね
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
    //toDO anyをやめる
    (req as any).user = payload; // { id, role }
    next();
  } catch {
    return res.status(401).json({
      code: 'INVALID_TOKEN',
      message: '無効なトークンです',
    });
  }
};

// 権限チェック
export const requireRole = (roles: Array<'ADMIN' | 'STUDENT'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        code: 'TOKEN_EXPIRED',
        message: 'ログインしてください',
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: '権限がありません',
      });
    }

    next();
  };
};
