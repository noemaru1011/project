import { LogRepository } from '@/features/log/repositories/logRepository';

export class LogService {
  constructor(private readonly logRepo: LogRepository) {}

  getDownloadableLogs() {
    return this.logRepo.getLogFiles();
  }
}
