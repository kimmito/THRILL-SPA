import { User } from '../../generated/prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export {};
