import { Request, Response } from 'express';
import { HistoryService } from '@/services/historyService';
import { AppError } from '@/errors/AppError';

export const HistoryController = {
  async searchHitories(req: Request, res: Response) {
    try {
      const histories = await HistoryService.searchHistoies(req.body);
      res.status(201).json({
        data: histories,
        message: '取得成功',
      });
    } catch (err) {
      return handleError(err, res);
    }
  },

  async createHistory(req: Request, res: Response) {
    try {
      await HistoryService.createHistory(req.body);
      res.status(201).json({ message: '追加完了' });
    } catch (err) {
      return handleError(err, res);
    }
  },

  async getHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: '履歴が見つかりません' });
      }

      const history = await HistoryService.getHistory(id);
      if (!history) {
        return res.status(404).json({ message: '履歴が見つかりません' });
      }

      return res.json({ data: history, message: '取得成功' });
    } catch (err) {
      return handleError(err, res);
    }
  },

  async updateHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: '履歴が見つかりません' });
      }
      await HistoryService.updateHistory(req.body, id);
      return res.status(200).json({ message: '更新完了' });
    } catch (err) {
      return handleError(err, res);
    }
  },

  async deleteHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: '履歴が見つかりません' });
      }

      await HistoryService.deleteHistory(id);
      return res.status(200).json({ message: '削除完了' });
    } catch (err) {
      return handleError(err, res);
    }
  },
};

function handleError(err: unknown, res: Response) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    message: '予期せぬエラーが発生しました',
  });
}
