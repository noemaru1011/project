import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    console.log('validateBody - req.body:', req.body);
    if (!result.success) {
      console.log('validateBody - validation error:', result.error);
      return res.status(400).json({ message: '入力エラー' });
    }
    req.body = result.data;
    console.log('validateBody - validation passed, calling next()');
    next();
  };
