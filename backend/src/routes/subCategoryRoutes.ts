import { Router } from 'express';
import { SubCategoryController } from '@/controllers/subCategoryController';

const router = Router();

router.get('/', SubCategoryController.getAllSubCategories);

export default router;
