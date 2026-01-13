import { Router } from 'express';
import { departmentController } from '@/registry';

const router = Router();

router.get('/', departmentController.getAllDepartments);

export default router;
