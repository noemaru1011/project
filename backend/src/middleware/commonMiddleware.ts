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
