import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';

const allowedOrigins = [
  process.env.FRONT_URL,
  /\.vercel\.app$/,
  'http://localhost:3000',
].filter((origin): origin is string | RegExp => origin !== undefined);
// ✅ 型ガードで undefined を明示的に除外

// HTTPレイヤ
export const commonMiddlewares = [
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
  helmet(),
  cookieParser(),
  express.json({ limit: '10kb' }),
  express.urlencoded({ extended: true, limit: '10kb' }),
];