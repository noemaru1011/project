import { Request, Response } from 'express';
import { HistoryService } from '@/services/historyService';

export const HistoryController = {
  async searchHitories(req: Request, res: Response) {
    try {
      const histories = await HistoryService.searchHistoies(req.body);
      res.status(201).json({
        data: histories,
        message: '取得成功',
      });
    } catch (err: any) {
      res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },

  async createHistory(req: Request, res: Response) {
    try {
      await HistoryService.createHistory(req.body);
      res.status(201).json({ message: '追加完了' });
    } catch (err: any) {
      return res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },
};
