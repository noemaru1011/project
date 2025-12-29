import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { serverValidation, serverUpdateValidation } from '@shared/schemas/history';
import { HistoryController } from '@/controllers/historyController';

const router = Router();

router.post('/', validateBody(serverValidation), HistoryController.createHistory);

router.get('/:id', HistoryController.getHistory);

router.put('/:id', validateBody(serverUpdateValidation), HistoryController.updateHistory);

router.delete('/:id', HistoryController.deleteHistory);

export default router;
