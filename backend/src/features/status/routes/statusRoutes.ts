import { Router } from 'express';
import { statusController } from '@/buildAppModules';

const router = Router();

router.get('/', statusController.getAllStatuses);

export default router;
