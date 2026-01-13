import { Router } from 'express';
import { subCategoryController } from '@/registry';

const router = Router();

router.get('/', subCategoryController.getAllSubCategories);

export default router;
