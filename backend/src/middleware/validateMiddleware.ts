import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateBody =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "入力エラー" });
    }
    req.body = result.data;
    next();
  };
