import { Router } from 'express';
import { subCategoryController } from '@/buildAppModules';

const router = Router();

router.get('/', subCategoryController.getAllSubCategories);

export default router;
