import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { HistoryServerCreateSchema, HistoryServerUpdateSchema } from '@shared/models/history';
import { HistoryController } from '@/controllers/historyController';
import { csrfMiddleware } from '@/middleware';
const router = Router();

router.post('/', csrfMiddleware, validateBody(HistoryServerCreateSchema), HistoryController.createHistory);

router.get('/:id', HistoryController.getHistory);

router.put(
  '/:id',
  csrfMiddleware,
  validateBody(HistoryServerUpdateSchema),
  HistoryController.updateHistory,
);

router.delete('/:id', csrfMiddleware, HistoryController.deleteHistory);

export default router;
