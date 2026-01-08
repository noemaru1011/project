import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { serverValidation } from '@shared/schemas/studentQuery';
import { StudentController } from '@/controllers/studentController';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post('/', csrfMiddleware, validateBody(serverValidation), StudentController.searchStudents);

export default router;
