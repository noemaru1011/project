import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { serverValidation } from '@shared/schemas/studentQuery';
import { StudentController } from '@/controllers/studentController';

const router = Router();

router.post('/', validateBody(serverValidation), StudentController.searchStudents);

export default router;
