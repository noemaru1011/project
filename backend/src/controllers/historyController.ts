import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '@/services/historyService';
import { APIMESSAGE } from '@shared/apiMessage';

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

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: APIMESSAGE.NO_HISTORY });
      }

      const history = await HistoryService.getHistory(id);
      if (!history) {
        return res.status(404).json({ message: APIMESSAGE.NO_HISTORY });
      }

      return res.status(200).json({ data: history, message: APIMESSAGE.FETCH_SUCCESS });
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

  async updateHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: APIMESSAGE.NO_HISTORY });
      }
      await HistoryService.updateHistory(req.body, id);
      return res.status(200).json({ message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },

  async deleteHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: APIMESSAGE.NO_HISTORY });
      }

      await HistoryService.deleteHistory(id);
      return res.status(200).json({ message: APIMESSAGE.DELETE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
