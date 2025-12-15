import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { validation } from '@shared/schemas/history';
import { HistoryController } from '@/controllers/historyController';

const router = Router();

router.post('/', validateBody(validation), HistoryController.createHistory);

router.get('/:id', HistoryController.getHistory);

export default router;
