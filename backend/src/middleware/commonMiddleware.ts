import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';

// HTTPレイヤ
export const commonMiddlewares = [
  cors({
    origin: true, //process.env.FRONT_URL,デプロイできないのだ(´;ω;｀)
    credentials: true,
  }),
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
  cookieParser(),
  express.json({ limit: '10kb' }),
  express.urlencoded({ extended: true, limit: '10kb' }),
];
