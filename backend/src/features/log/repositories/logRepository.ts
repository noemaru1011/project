import path from 'path';
import fs from 'fs';
import { LogFile } from '@/types/LogFile';

const logDir = process.env.NODE_ENV === 'development' ? 'logs-test' : 'logs';

export class LogRepository {
  private readonly LOG_DIR = path.join(process.cwd(), logDir);
  private readonly ALLOWED_LOG_FILES = ['access.log', 'error.log'];

  getLogFiles(): LogFile[] {
    return this.ALLOWED_LOG_FILES.map((file) => {
      const fullPath = path.join(this.LOG_DIR, file);

      if (!fs.existsSync(fullPath)) {
        return null;
      }

      return {
        filename: file,
        path: fullPath,
      };
    }).filter((v): v is LogFile => v !== null);
  }
}
