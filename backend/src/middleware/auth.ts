import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "未ログインです" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).jwtPayload = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "トークンが無効です" });
  }
};
