import { Router } from 'express';
import { minorCategoryController } from '@/buildAppModules';

const router = Router();

router.get('/', minorCategoryController.getAllMinorCategories);

export default router;
