import 'dotenv/config';
import { UnauthorizedError } from 'restify-errors';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {
  IAuthService,
  authService,
} from '@application/services/auth/Auth.service';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

class AuthMiddleware {
  private readonly _authService: IAuthService = authService;

  handler = async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.get('authorization')?.replace('Bearer ', '');

      if (!token || token === 'null') {
        throw new UnauthorizedError('Token expired or not provided!');
      }

      const issuerInfo = await this._authService.getUser(token);

      req.body = { ...req.body, id: issuerInfo.id };
      next();
    } catch (err) {
      next(err);
    }
  };
}

export const authMiddleware = new AuthMiddleware();
