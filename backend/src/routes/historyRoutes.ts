import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { validation } from '@shared/schemas/history';
import { HistoryController } from '@/controllers/historyController';

const router = Router();

console.log('History routes: POST / registered');
router.post('/', validateBody(validation), HistoryController.createHistory);

export default router;
