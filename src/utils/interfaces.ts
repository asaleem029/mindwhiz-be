import { Request } from 'express';

export interface ICustomRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export interface ICustomHeaders {
  language?: string;
}

