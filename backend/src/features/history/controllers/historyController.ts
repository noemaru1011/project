import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '@/features/history/service/historyService';
import type { ApiBody } from '@shared/models/common';
import type { HistoryResponse, HistorySummary } from '@shared/models/history';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  searchHistories = async (
    req: Request,
    res: Response<ApiBody<HistorySummary[]>>,
    next: NextFunction,
  ) => {
    try {
      const histories = await this.historyService.searchHistories(req.body);
      return res.status(200).json({
        code: 'FETCH_SUCCESS',
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

      const query = new Date(datetimeStr);

      const histories = await this.historyService.searchByStartTimeHistories(query);
      return res.status(200).json({
        code: 'FETCH_SUCCESS',
        data: histories,
        message: APIMESSAGE.FETCH_SUCCESS,
      });
    } catch (error) {
      return next(error);
    }
  };

  getHistory = async (
    req: Request,
    res: Response<ApiBody<HistoryResponse>>,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const history = await this.historyService.getHistory(id);
      return res
        .status(200)
        .json({ code: 'FETCH_SUCCESS', data: history, message: APIMESSAGE.FETCH_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  createHistory = async (
    req: Request,
    res: Response<ApiBody<HistoryResponse[]>>,
    next: NextFunction,
  ) => {
    try {
      const history = await this.historyService.createHistory(req.body);
      return res
        .status(201)
        .json({ code: 'CREATE_SUCCESS', data: history, message: APIMESSAGE.CREATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  updateHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.historyService.updateHistory(req.body, id);
      return res.status(200).json({ code: 'UPDATE_SUCCESS', message: APIMESSAGE.UPDATE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  deleteHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.historyService.deleteHistory(id);
      return res.status(204);
    } catch (error) {
      return next(error);
    }
  };
}
