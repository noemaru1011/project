import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import { ApiBody } from '@shared/models/common';
import { ParsedQs } from 'qs';

export const validateBody =
  (schema: ZodType) => (req: Request, res: Response<ApiBody<object>>, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        code: 'VALIDATE_ERROR',
        message: APIMESSAGE.VALIDATE_ERROR,
        data: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          reason: issue.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };

export const validateQuery =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        code: 'VALIDATE_ERROR',
        message: APIMESSAGE.VALIDATE_ERROR,
        data: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          reason: issue.message,
        })),
      });
    }

    req.query = result.data as ParsedQs;
    next();
  };
