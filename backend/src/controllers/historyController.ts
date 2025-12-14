import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '@/services/historyService';
import { apiMessage } from '@/constants/apiMessage';

export const HistoryController = {
  async searchHitories(req: Request, res: Response, next: NextFunction) {
    try {
      const histories = await HistoryService.searchHistoies(req.body);
      return res.status(201).json({
        data: histories,
        message: apiMessage.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },

  async createHistory(req: Request, res: Response, next: NextFunction) {
    try {
      await HistoryService.createHistory(req.body);
      return res.status(201).json({ message: apiMessage.CREATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
