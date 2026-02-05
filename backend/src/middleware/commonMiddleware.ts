import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';

// HTTPレイヤ
export const commonMiddlewares = [
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      // 1. 開発環境(originなし) 2. FRONT_URLと一致 3. VercelのプレビューURL
      if (!origin || origin === process.env.FRONT_URL || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
  helmet(),
  cookieParser(),
  express.json({ limit: '10kb' }),
  express.urlencoded({ extended: true, limit: '10kb' }),
];
