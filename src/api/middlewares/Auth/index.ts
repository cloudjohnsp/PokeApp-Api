import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { UnauthorizedError } from 'restify-errors';

export const SECRET_KEY: Secret = process.env.SECRET_KEY!;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedError('Token expired or not provided!');
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    next(err);
  }
};
