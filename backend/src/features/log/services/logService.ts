import { LogRepository } from '@/features/log/repositories/logRepository';
import { NotFoundError } from '@/errors/appError';

export class LogService {
  constructor(private readonly logRepo: LogRepository) {}

  getDownloadableLogs() {
    const logFiles = this.logRepo.getLogFiles();
    if (logFiles.length === 0) {
      throw new NotFoundError();
    }
    return logFiles;
  }
}
