import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { validation, updateValidation } from '@shared/schemas/student';
import { StudentController } from '@/controllers/studentController';

const router = Router();

router.get('/:id', StudentController.getStudent);

router.post('/', validateBody(validation), StudentController.createStudent);

router.put('/:id', validateBody(updateValidation), StudentController.updateStudent);

router.delete('/:id', StudentController.deleteStudet);

export default router;
