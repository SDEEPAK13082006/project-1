import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'Admin' | 'Parent' | 'Child';
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
