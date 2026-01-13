import { LogRepository } from '@/repositories/logRepository';

export class LogService {
  constructor(private logRepo: LogRepository) {}

  getDownloadableLogs() {
    return this.logRepo.getLogFiles();
  }
}
