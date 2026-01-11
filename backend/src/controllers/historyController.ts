import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '@/services/historyService';
import type { Apibody } from '@/types/apiBody';
import type { HistoryDetail, HistorySummary } from '@shared/types/history';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export const HistoryController = {
  async searchHistories(
    req: Request,
    res: Response<Apibody<HistorySummary[]>>,
    next: NextFunction,
  ) {
    try {
      const histories = await HistoryService.searchHistories(req.body);
      const key: ApiMessageKey = 'FETCH_SUCCESS';
      return res.status(201).json({
        code: key,
        data: histories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },
  async searchByStartTimeHistories(req: Request, res: Response, next: NextFunction) {
    try {
      const datetimeStr = req.query.datetime as string;
      if (!datetimeStr) {
        return res.status(400).json({ message: APIMESSAGE.INVALID_DATETIME });
      }
      const query = new Date(datetimeStr);
      if (isNaN(query.getTime())) {
        return res.status(400).json({ message: APIMESSAGE.INVALID_DATETIME });
      }

      const histories = await HistoryService.searchByStartTimeHistories(query);
      const key: ApiMessageKey = 'FETCH_SUCCESS';
      return res.status(201).json({
        code: key,
        data: histories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getHistory(req: Request, res: Response<Apibody<HistoryDetail>>, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        const key: ApiMessageKey = 'NO_HISTORY';
        return res.status(404).json({ code: key, data: null, message: APIMESSAGE.NO_HISTORY });
      }

      const history = await HistoryService.getHistory(id);
      if (!history) {
        const key: ApiMessageKey = 'NO_HISTORY';
        return res.status(404).json({ code: key, data: null, message: APIMESSAGE.NO_HISTORY });
      }

      const key: ApiMessageKey = 'FETCH_SUCCESS';
      return res.status(200).json({ code: key, data: history, message: APIMESSAGE.FETCH_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },

  async createHistory(req: Request, res: Response, next: NextFunction) {
    try {
      await HistoryService.createHistory(req.body);
      const key: ApiMessageKey = 'CREATE_SUCCESS';
      return res.status(201).json({ code: key, message: APIMESSAGE.CREATE_SUCCESS });
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
      const key: ApiMessageKey = 'UPDATE_SUCCESS';
      return res.status(200).json({ code: key, message: APIMESSAGE.UPDATE_SUCCESS });
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
      const key: ApiMessageKey = 'DELETE_SUCCESS';
      return res.status(200).json({ code: key, message: APIMESSAGE.DELETE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  },
};
