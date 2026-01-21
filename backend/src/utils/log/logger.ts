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

const logDir = process.env.NODE_ENV === 'development' ? 'logs-test' : 'logs';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: jstTimestamp }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: [
    // エラーログ
    new DailyRotateFile({
      dirname: logDir,
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d',
    }),
    // アクセスログ
    new DailyRotateFile({
      dirname: logDir,
      filename: 'access-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxFiles: '14d',
      format: winston.format((info) =>
        info.type !== 'resource' && info.type !== 'prisma-query' ? info : false,
      )(),
    }),
    // リソースログ
    new DailyRotateFile({
      dirname: logDir,
      filename: 'resource-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxFiles: '14d',
      format: winston.format((info) => (info.type === 'resource' ? info : false))(),
    }),
    // Prisma クエリ専用ログ
    new DailyRotateFile({
      dirname: logDir,
      filename: 'prisma-query-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format((info) => (info.type === 'prisma-query' ? info : false))(),
        winston.format.printf((info) => {
          // より読みやすい形式
          return JSON.stringify({
            timestamp: info.timestamp,
            duration: `${info.duration}ms`,
            sql: info.sql,
            params: info.params,
          }, null, 2);
        }),
      ),
    }),
  ],
});
