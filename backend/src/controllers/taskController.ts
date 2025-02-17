import { Request, Response } from 'express';
import * as taskService from '../services/taskService.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';

export async function getTasks(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user.id;
  try {
    const tasks = await taskService.getTasks(userId);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createTask(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user.id;
  const { title, description } = req.body;
  try {
    const task = await taskService.createTask(userId, title, description);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateTask(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user.id;
  const taskId = parseInt(req.params.id, 10);
  const { title, description, isComplete } = req.body;
  try {
    const updatedTask = await taskService.updateTask(userId, taskId, { title, description, isComplete });
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found or not authorized' });
      return;
    }
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteTask(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user.id;
  const taskId = parseInt(req.params.id, 10);
  try {
    const success = await taskService.deleteTask(userId, taskId);
    if (!success) {
      res.status(404).json({ message: 'Task not found or not authorized' });
      return;
    }
    res.json({ message: 'Task deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
