import { Request, Response } from 'express';
import { HistoryService } from '@/services/historyService';

export const HistoryController = {
  async createHistory(req: Request, res: Response) {
    try {
      console.log('HistoryController.createHistory - req.body:', req.body);
      await HistoryService.createHistory(req.body);
      console.log('HistoryController.createHistory - success, sending response');
      res.status(201).json({ message: '追加完了' });
    } catch (err: any) {
      console.error('HistoryController.createHistory - error:', err);
      return res.status(500).json({ message: '予期せぬエラーが発生しました' });
    }
  },
};
