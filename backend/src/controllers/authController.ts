import { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const user = await authService.register(username, password);
    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
