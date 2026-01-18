import path from 'path';
import fs from 'fs';
import { LogFile } from '@/types/LogFile';

const logDir = process.env.NODE_ENV === 'development' ? 'logs-test' : 'logs';

export class LogRepository {
  private readonly LOG_DIR = path.join(process.cwd(), logDir);

  getLogFiles(): LogFile[] {
    if (!fs.existsSync(this.LOG_DIR)) {
      return [];
    }

    const files = fs.readdirSync(this.LOG_DIR);

    return files.map((file) => ({
      filename: file,
      path: path.join(this.LOG_DIR, file),
    }));
  }
}
