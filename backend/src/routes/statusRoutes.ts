import { Router } from 'express';
import { StatusController } from '@/controllers/StatusController';

const router = Router();

router.get('/', StatusController.getAllStatuses);

export default router;
