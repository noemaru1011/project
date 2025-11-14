import rateLimit from "express-rate-limit";
import helmet from "helmet";
import express from "express";

export const securityMiddleware = () => {
  // 1. Rate Limiting（15分間に100リクエストまで）
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分
    max: 100, // 1IPあたり
    standardHeaders: true, // HTTP標準ヘッダーで制限情報を返す
    legacyHeaders: false, // 古いヘッダーは無効
    message: "リクエストが多すぎます",
  });

  // 2. Helmetでヘッダー強化
  const helmetMiddleware = helmet();

  // 3. Bodyサイズ制限（JSON, URL-encoded）
  const bodySizeLimit = [
    express.json({ limit: "10kb" }),
    express.urlencoded({ limit: "10kb", extended: true }),
  ];

  // まとめて返すミドルウェア配列
  return [helmetMiddleware, limiter, ...bodySizeLimit];
};
