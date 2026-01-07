import { Request } from 'express';

export interface ICustomRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

enum LANGUAGE {
  EN = "EN",
}

export interface ICustomHeaders {
  language: LANGUAGE;
}

