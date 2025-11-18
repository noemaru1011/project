import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

// リクエストログ
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).user?.id ?? "anonymous";
  const msg = `${req.method} ${req.originalUrl} | user:${userId}`;

  // 非同期で書き込み、失敗しても処理を止めない
  Promise.resolve(logger.info(msg)).catch(console.error);

  next();
};
