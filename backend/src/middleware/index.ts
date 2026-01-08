import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';

// HTTPレイヤ
export const commonMiddlewares = [
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  }),
  helmet(),
  cookieParser(),
  express.json({ limit: '10kb' }),
  express.urlencoded({ extended: true, limit: '10kb' }),
];

// ドメイン/アプリレイヤ
export * from './authMiddleware';
export * from './errorLogger';
export * from './requestLogger';
export * from './securityMiddleware';
export * from './validateMiddleware';
export * from './csrfMiddleware';
