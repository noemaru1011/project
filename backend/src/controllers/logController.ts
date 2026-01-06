import { Request, Response, NextFunction } from 'express';
import archiver from 'archiver';
import { getDownloadableLogs } from '@/services/logService';

export const downloadLogsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const files = getDownloadableLogs();

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=logs.zip');

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(res);

    for (const file of files) {
      archive.file(file.path, { name: file.filename });
    }

    await archive.finalize();
  } catch (error) {
    console.error('log download failed:', error);
    return next(error);
  }
};
