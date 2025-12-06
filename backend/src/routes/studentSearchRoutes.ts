import { Router } from 'express';
import { StudentController } from '@/controllers/studentController';

const router = Router();

router.post('/', StudentController.searchStudents);

export default router;
