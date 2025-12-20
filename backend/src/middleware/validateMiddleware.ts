import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export const validateBody =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const key: ApiMessageKey = 'VALIDATE_ERROR';

      return res.status(400).json({
        code: key,
        message: APIMESSAGE.VALIDATE_ERROR,
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          reason: issue.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
