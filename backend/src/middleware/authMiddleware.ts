import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token.js';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token required' });
    return;
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
}
