import { Router } from 'express';
import { departmentController } from '@/buildAppModules';

const router = Router();

router.get('/', departmentController.getAllDepartments);

export default router;
