import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// 日本時刻
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

export const createLogger = (logDir: string) => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({ format: jstTimestamp }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json(),
    ),
    transports: [
      new DailyRotateFile({
        dirname: logDir,
        filename: 'error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        maxFiles: '14d',
      }),
      new DailyRotateFile({
        dirname: logDir,
        filename: 'access-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'info',
        maxFiles: '14d',
      }),
    ],
  });
};

const logDir = process.env.NODE_ENV === 'development' ? 'logs-test' : 'logs';

export const logger = createLogger(logDir);
