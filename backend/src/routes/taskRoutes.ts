import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
