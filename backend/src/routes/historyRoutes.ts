import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { validation, updateValidation } from '@shared/schemas/history';
import { HistoryController } from '@/controllers/historyController';

const router = Router();

router.post('/', validateBody(validation), HistoryController.createHistory);

router.get('/:id', HistoryController.getHistory);

router.put('/:id', validateBody(updateValidation), HistoryController.updateHistory);

export default router;
