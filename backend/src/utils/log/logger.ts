import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/**
 * JST タイムスタンプ（現状維持）
 */
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

/**
 * access ログ用フォーマット
 * 例：[2026/01/21 10:01:12] GET /students/123 200 34ms
 */
const accessFormat = winston.format.printf((info) => {
  const { timestamp, method, url, status, responseTime } = info;

  // 起動ログなど（method が無い場合）
  if (!method) {
    return `[${timestamp}] ${info.message}`;
  }

  return `[${timestamp}] ${method} ${url} ${status} ${responseTime}ms`;
});

/**
 * Prisma Query ログ用フォーマット
 */
const prismaQueryFormat = winston.format.printf((info) => {
  return `
[${info.timestamp}] Prisma Query
duration: ${info.duration}ms
sql:
${info.sql}

params:
${JSON.stringify(info.params, null, 2)}
`.trim();
});

export const logger = winston.createLogger({
  level: 'info',

  /**
   * 共通フォーマット
   * ※ json() は入れない（transport 側で制御）
   */
  format: winston.format.combine(
    winston.format.timestamp({ format: jstTimestamp }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
  ),

  transports: [
    /**
     * ========= error ログ =========
     * JSON 1行（stack 含む）
     */
    new DailyRotateFile({
      dirname: logDir,
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d',
      format: winston.format.json(),
      utc: false,
    }),

    /**
     * ========= access ログ =========
     * text 1行
     */
    new DailyRotateFile({
      dirname: logDir,
      filename: 'access-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxFiles: '14d',
      utc: false,
      format: winston.format.combine(
        // resource / prisma-query を除外
        winston.format((info) =>
          info.type !== 'resource' && info.type !== 'prisma-query' ? info : false,
        )(),
        accessFormat,
      ),
    }),

    /**
     * ========= resource ログ =========
     * JSON 1行（構造化）
     */
    new DailyRotateFile({
      dirname: logDir,
      filename: 'resource-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxFiles: '14d',
      utc: false,
      format: winston.format.combine(
        winston.format((info) => (info.type === 'resource' ? info : false))(),
        winston.format.json(),
      ),
    }),

    /**
     * ========= Prisma Query ログ =========
     * text 複数行（人間向け）
     */
    new DailyRotateFile({
      dirname: logDir,
      filename: 'prisma-query-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxFiles: '14d',
      utc: false,
      format: winston.format.combine(
        winston.format((info) => (info.type === 'prisma-query' ? info : false))(),
        prismaQueryFormat,
      ),
    }),
  ],
});
