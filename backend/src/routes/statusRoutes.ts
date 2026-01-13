import { Router } from 'express';
import { statusController } from '@/registry';

const router = Router();

router.get('/', statusController.getAllStatuses);

export default router;
