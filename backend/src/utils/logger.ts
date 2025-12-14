import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { Transform } from 'stream';

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

// 日付に基づいてファイル名を生成する関数
const getDateBasedFilename = (prefix: string): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}_${month}_${day}`;
  return path.join('logs', `${dateStr}_${prefix}.log`);
};

// 日付文字列を取得する関数
const getCurrentDateStr = (): string => {
  const now = new Date();
  return `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
};

// 日付ベースのファイルストリームを作成するクラス
class DateBasedFileStream extends Transform {
  private currentDateStr: string;
  private prefix: string;
  private fileStream: fs.WriteStream | null = null;
  private currentFilename: string;

  constructor(prefix: string) {
    super({ objectMode: false });
    this.prefix = prefix;
    this.currentDateStr = getCurrentDateStr();
    this.currentFilename = getDateBasedFilename(this.prefix);
    this.ensureLogDirectory();
    this.openFile();
  }

  private ensureLogDirectory(): void {
    const logDir = path.dirname(this.currentFilename);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  private openFile(): void {
    if (this.fileStream) {
      this.fileStream.end();
    }
    this.fileStream = fs.createWriteStream(this.currentFilename, { flags: 'a' });
  }

  private updateFileIfNeeded(): void {
    const newDateStr = getCurrentDateStr();
    if (newDateStr !== this.currentDateStr) {
      this.currentDateStr = newDateStr;
      this.currentFilename = getDateBasedFilename(this.prefix);
      this.openFile();
    }
  }

  _transform(chunk: Buffer, encoding: string, callback: () => void): void {
    this.updateFileIfNeeded();
    if (this.fileStream) {
      this.fileStream.write(chunk);
    }
    callback();
  }

  _flush(callback: () => void): void {
    if (this.fileStream) {
      this.fileStream.end(() => {
        callback();
      });
    } else {
      callback();
    }
  }
}

// ログディレクトリが存在しない場合は作成
const logDir = path.join('logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.Stream({
      stream: new DateBasedFileStream('error'),
      level: 'error',
    }),
    new winston.transports.Stream({
      stream: new DateBasedFileStream('access'),
      level: 'info',
    }),
  ],
});
