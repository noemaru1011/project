import { Router } from 'express';
import { categoryController } from '@/buildAppModules';

const router = Router();

router.get('/', categoryController.getAllCategories);

export default router;
