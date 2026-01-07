import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ICustomRequest } from '../utils/interfaces.js';
import { UserRole } from '../models/userModel.js';

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const authenticate = (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid token.',
      });
    }

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret) as JWTPayload;

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please login again.',
    });
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: ICustomRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (!roles.includes(req.user.role as UserRole)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not have permission to perform this action.',
      });
    }

    next();
  };
};

