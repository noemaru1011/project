import { Request, Response, NextFunction } from 'express';
import archiver from 'archiver';
import { LogService } from '@/features/log/services/logService';

export class LogController {
  constructor(private readonly logService: LogService) {}

  downloadLogs = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const files = this.logService.getDownloadableLogs();

      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=logs.zip');

      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.pipe(res);

      for (const file of files) {
        archive.file(file.path, { name: file.filename });
      }

      await archive.finalize();
    } catch (error) {
      return next(error);
    }
  };
}
