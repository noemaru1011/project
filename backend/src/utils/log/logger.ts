import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const jstTimestamp = () =>
  new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const logDir = process.env.NODE_ENV === 'production' ? 'logs' : 'logs-test';

// アクセスログ（テキスト形式）
const accessFormat = winston.format.printf((info) => {
  const { timestamp, method, url, status, responseTime, message } = info;
  if (!method) return `[${timestamp}] ${message}`;
  return `[${timestamp}] ${method} ${url} ${status} ${responseTime}ms`;
});

// Prisma Queryログ（複数行テキスト）
const prismaQueryFormat = winston.format.printf((info) => {
  return `[${info.timestamp}] Prisma Query\nduration: ${info.duration}ms\nsql:\n${info.sql}\nparams:\n${JSON.stringify(info.params, null, 2)}`.trim();
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: jstTimestamp }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
  ),
  transports: [
    // 1. Error ログ (JSON)
    new DailyRotateFile({
      dirname: logDir,
      filename: 'error-%DATE%.log',
      level: 'error',
      format: winston.format.json(), // JSON 1行
    }),

    // 2. Access ログ (Text)
    new DailyRotateFile({
      dirname: logDir,
      filename: 'access-%DATE%.log',
      level: 'info',
      format: winston.format.combine(
        winston.format((info) =>
          info.type === 'resource' || info.type === 'prisma-query' ? false : info,
        )(),
        accessFormat,
      ),
    }),

    // 3. Resource ログ (JSON)
    new DailyRotateFile({
      dirname: logDir,
      filename: 'resource-%DATE%.log',
      level: 'info',
      format: winston.format.combine(
        winston.format((info) => (info.type === 'resource' ? info : false))(),
        winston.format.json(),
      ),
    }),

    // 4. Prisma Query ログ (Text)
    new DailyRotateFile({
      dirname: logDir,
      filename: 'prisma-query-%DATE%.log',
      level: 'info',
      format: winston.format.combine(
        winston.format((info) => (info.type === 'prisma-query' ? info : false))(),
        prismaQueryFormat,
      ),
    }),
  ],
});
