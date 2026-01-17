import { Router } from 'express';
import { historyController } from '@/buildAppModules';
import { validateBody } from '@/middleware/validateMiddleware';
import { StudentServerSearchSchema } from '@shared/models/student';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post(
  '/',
  csrfMiddleware,
  validateBody(StudentServerSearchSchema),
  historyController.searchHistories,
);

router.get('/', historyController.searchByStartTimeHistories);

export default router;
