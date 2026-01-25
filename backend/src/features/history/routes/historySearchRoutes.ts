import { Router } from 'express';
import { historyController } from '@/buildAppModules';
import { validateBody, validateQuery } from '@/middleware/validateMiddleware';
import { StudentServerSearchSchema } from '@shared/models/student';
import { HistoryServerSearchSchema } from '@shared/models/history';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post(
  '/',
  csrfMiddleware,
  validateBody(StudentServerSearchSchema),
  historyController.searchHistories,
);

router.get(
  '/',
  validateQuery(HistoryServerSearchSchema),
  historyController.searchByStartTimeHistories,
);

export default router;
