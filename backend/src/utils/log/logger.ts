import winston from 'winston';
import path from 'path';

//日本時刻に修正
const jstTimestamp = () => {
  return new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

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
      new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
      }),
      new winston.transports.File({
        filename: path.join(logDir, 'access.log'),
        level: 'info',
      }),
    ],
  });
};

const logDir = process.env.NODE_ENV === 'development' ? 'logs-test' : 'logs';

export const logger = createLogger(logDir);
