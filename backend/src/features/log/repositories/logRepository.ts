import path from 'path';
import fs from 'fs';

const logDir = process.env.NODE_ENV === 'development' ? 'logs-test' : 'logs';

export class LogRepository {
  private readonly LOG_DIR = path.join(process.cwd(), logDir);
  private readonly ALLOWED_LOG_FILES = ['access.log', 'error.log'];

  getLogFiles() {
    const files = this.ALLOWED_LOG_FILES.map((file) => {
      const fullPath = path.join(this.LOG_DIR, file);

      if (!fs.existsSync(fullPath)) {
        throw new Error(`${file} が存在しません`);
      }

      return {
        filename: file,
        path: fullPath,
      };
    });

    return files;
  }
}
