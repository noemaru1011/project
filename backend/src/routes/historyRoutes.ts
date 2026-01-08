import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { serverValidation, serverUpdateValidation } from '@shared/schemas/history';
import { HistoryController } from '@/controllers/historyController';
import { csrfMiddleware } from '@/middleware';
const router = Router();

router.post('/', csrfMiddleware, validateBody(serverValidation), HistoryController.createHistory);

router.get('/:id', HistoryController.getHistory);

router.put(
  '/:id',
  csrfMiddleware,
  validateBody(serverUpdateValidation),
  HistoryController.updateHistory,
);

router.delete('/:id', csrfMiddleware, HistoryController.deleteHistory);

export default router;
