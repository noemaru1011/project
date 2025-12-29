import { Router } from 'express';
import { HistoryController } from '@/controllers/historyController';
import { validateBody } from '@/middleware/validateMiddleware';
import { serverValidation } from '@shared/schemas/studentQuery';

const router = Router();

router.post('/', validateBody(serverValidation), HistoryController.searchHistories);

export default router;
