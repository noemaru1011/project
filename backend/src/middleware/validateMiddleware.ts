import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { APIMESSAGE } from '@/constants/apiMessage';
import type { ApiMessageKey } from '@/constants/apiMessage';

export const validateBody =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const key: ApiMessageKey = 'VALIDATE_ERROR';
      return res.status(400).json({ code: key, message: APIMESSAGE.VALIDATE_ERROR });
    }
    req.body = result.data;
    next();
  };
