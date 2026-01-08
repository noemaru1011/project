import { Router } from 'express';
import { HistoryController } from '@/controllers/historyController';
import { validateBody } from '@/middleware/validateMiddleware';
import { serverValidation } from '@shared/schemas/studentQuery';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post('/', csrfMiddleware, validateBody(serverValidation), HistoryController.searchHistories);

router.get('/', validateBody(serverValidation), HistoryController.searchByStartTimeHistories);

export default router;
