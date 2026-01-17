import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { StudentServerSearchSchema } from '@shared/models/student';
import { studentController } from '@/buildAppModules';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post(
  '/',
  csrfMiddleware,
  validateBody(StudentServerSearchSchema),
  studentController.searchStudents,
);

export default router;
