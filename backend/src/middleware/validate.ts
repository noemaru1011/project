import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ message: "入力エラー", errors: result.error.flatten() });
    }
    req.body = result.data;
    next();
  };
