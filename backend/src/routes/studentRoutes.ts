import { Router } from 'express';
import { validateBody } from '@/middleware/validateMiddleware';
import { validation } from '@shared/schemas/Student';
import { StudentController } from '@/controllers/studentController';

const router = Router();

router.get('/', StudentController.getAllStudents);

router.get('/:id', StudentController.getStudent);

router.post('/search', StudentController.searchStudents);

router.post('/', validateBody(validation), StudentController.createStudent);

router.put('/:id', validateBody(validation), StudentController.updateStudent);

router.delete('/;id', StudentController.deleteStudet);

export default router;
