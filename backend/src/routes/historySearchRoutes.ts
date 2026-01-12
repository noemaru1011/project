import { Router } from 'express';
import { HistoryController } from '@/controllers/historyController';
import { validateBody } from '@/middleware/validateMiddleware';
import { StudentServerSearchSchema } from '@shared/models/student';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post('/', csrfMiddleware, validateBody(StudentServerSearchSchema), HistoryController.searchHistories);

router.get('/', HistoryController.searchByStartTimeHistories);

export default router;
