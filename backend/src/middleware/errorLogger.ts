import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

export const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).user?.id ?? "guest";

  logger.error(
    `${req.method} ${req.originalUrl} | user:${userId} | msg:${err.message} | stack:${err.stack}`
  );

  next(err);
};
