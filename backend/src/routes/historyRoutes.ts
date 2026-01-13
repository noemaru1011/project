import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { HistoryServerCreateSchema, HistoryServerUpdateSchema } from '@shared/models/history';
import { historyController } from '@/registry';
import { csrfMiddleware } from '@/middleware';
const router = Router();

router.post(
  '/',
  csrfMiddleware,
  validateBody(HistoryServerCreateSchema),
  historyController.createHistory
);

router.get('/:id', historyController.getHistory);

router.put(
  '/:id',
  csrfMiddleware,
  validateBody(HistoryServerUpdateSchema),
  historyController.updateHistory
);

router.delete('/:id', csrfMiddleware, historyController.deleteHistory);

export default router;
