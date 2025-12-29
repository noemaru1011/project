import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { serverValidation, serverUpdateValidation } from '@shared/schemas/student';
import { StudentController } from '@/controllers/studentController';

const router = Router();

router.get('/:id', StudentController.getStudent);

router.post('/', validateBody(serverValidation), StudentController.createStudent);

router.put('/:id', validateBody(serverUpdateValidation), StudentController.updateStudent);

router.delete('/:id', StudentController.deleteStudet);

export default router;
