import { Router } from 'express';
import { minorCategoryController } from '@/registry';

const router = Router();

router.get('/', minorCategoryController.getAllMinorCategories);

export default router;
