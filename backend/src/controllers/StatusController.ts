import { Request, Response, NextFunction } from 'express';
import { StatusService } from '@/services/statusService';
import { APIMESSAGE } from '@/constants/APIMESSAGE';

export const StatusController = {
  async getAllStatuses(_req: Request, res: Response, next: NextFunction) {
    try {
      const statuses = await StatusService.getAllstatuses();
      res.status(200).json({
        data: statuses,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
};
