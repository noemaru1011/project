import { Router } from 'express';
import { categoryController } from '@/registry';

const router = Router();

router.get('/', categoryController.getAllCategories);

export default router;
