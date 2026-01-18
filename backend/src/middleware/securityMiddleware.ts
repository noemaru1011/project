import rateLimit from 'express-rate-limit';

//開発環境では使わない
export const securityMiddleware = {
  loginLimiter: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
  }),

  apiLimiter: rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
};
