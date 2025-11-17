import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).user.id ?? "guest";
  const msg = `${req.method} ${req.originalUrl} | user:${userId}`;

  logger.info(msg); // access.log に出力される
  next();
};
