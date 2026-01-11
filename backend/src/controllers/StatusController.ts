import { Request, Response, NextFunction } from 'express';
import { StatusService } from '@/services/statusService';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export const StatusController = {
  async getAllStatuses(_req: Request, res: Response, next: NextFunction) {
    try {
      const statuses = await StatusService.getAllstatuses();
      const key: ApiMessageKey = 'FETCH_SUCCESS';
      res.status(200).json({
        code: key,
        data: statuses,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
