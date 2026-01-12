import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { StudentServerSearchSchema } from '@shared/models/student';
import { StudentController } from '@/controllers/studentController';
import { csrfMiddleware } from '@/middleware';

const router = Router();

router.post('/', csrfMiddleware, validateBody(StudentServerSearchSchema), StudentController.searchStudents);

export default router;
