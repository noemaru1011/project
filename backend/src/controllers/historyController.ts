import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '@/services/historyService';
import { APIMESSAGE } from '@/constants/APIMESSAGE';

export const HistoryController = {
  async searchHitories(req: Request, res: Response, next: NextFunction) {
    try {
      const histories = await HistoryService.searchHistoies(req.body);
      return res.status(201).json({
        data: histories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },

  async createHistory(req: Request, res: Response, next: NextFunction) {
    try {
      await HistoryService.createHistory(req.body);
      return res.status(201).json({ message: APIMESSAGE.CREATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
