import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '@/services/historyService';
import type { ApiBody } from '@shared/models/common';
import type { HistoryResponse, HistorySummary } from '@shared/models/history';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';

export class HistoryController {
  constructor(private historyService: HistoryService) {}

  searchHistories = async (
    req: Request,
    res: Response<ApiBody<HistorySummary[]>>,
    next: NextFunction
  ) => {
    try {
      const histories = await this.historyService.searchHistories(req.body);
      const key: ApiMessageCode = 'FETCH_SUCCESS';
      return res.status(201).json({
        code: key,
        data: histories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  };

  searchByStartTimeHistories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const datetimeStr = req.query.datetime as string;
      if (!datetimeStr) {
        return res.status(400).json({ message: APIMESSAGE.INVALID_DATETIME });
      }
      const query = new Date(datetimeStr);
      if (isNaN(query.getTime())) {
        return res.status(400).json({ message: APIMESSAGE.INVALID_DATETIME });
      }

      const histories = await this.historyService.searchByStartTimeHistories(query);
      const key: ApiMessageCode = 'FETCH_SUCCESS';
      return res.status(200).json({
        code: key,
        data: histories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  };

  getHistory = async (req: Request, res: Response<ApiBody<HistoryResponse>>, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        const key: ApiMessageCode = 'NO_HISTORY';
        return res.status(404).json({ code: key, data: null, message: APIMESSAGE.NO_HISTORY });
      }

      const history = await this.historyService.getHistory(id);
      if (!history) {
        const key: ApiMessageCode = 'NO_HISTORY';
        return res.status(404).json({ code: key, data: null, message: APIMESSAGE.NO_HISTORY });
      }

      const key: ApiMessageCode = 'FETCH_SUCCESS';
      return res.status(200).json({ code: key, data: history, message: APIMESSAGE.FETCH_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  createHistory = async (
    req: Request,
    res: Response<ApiBody<HistoryResponse[]>>,
    next: NextFunction
  ) => {
    try {
      const history = await this.historyService.createHistory(req.body);
      const key: ApiMessageCode = 'CREATE_SUCCESS';
      return res.status(201).json({ code: key, data: history, message: APIMESSAGE.CREATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  updateHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: APIMESSAGE.NO_HISTORY });
      }
      await this.historyService.updateHistory(req.body, id);
      const key: ApiMessageCode = 'UPDATE_SUCCESS';
      return res.status(200).json({ code: key, message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  deleteHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: APIMESSAGE.NO_HISTORY });
      }

      await this.historyService.deleteHistory(id);
      const key: ApiMessageCode = 'DELETE_SUCCESS';
      return res.status(204).json({ code: key, message: APIMESSAGE.DELETE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };
}
