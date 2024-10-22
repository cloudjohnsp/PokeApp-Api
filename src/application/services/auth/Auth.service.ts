import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { UnauthorizedError } from 'restify-errors';
import { User } from '@domain/Entities/User/User';
import { PrismaUserRepository } from '@infra/repositories/PrismaUserRepository';
import { IUserRepository } from '@application/repositories/shared/IUserRepository.interface';

export interface IAuthService {
  getUser(id: string): Promise<User | never>;
}

interface DecodedToken extends JwtPayload {
  _id: string;
}

class AuthService implements IAuthService {
  private readonly SECRET_KEY: Secret = process.env.SECRET_KEY!;
  constructor(private readonly _userRepository: IUserRepository) {}

  private extractUserId(token: string) {
    const decoded = jwt.verify(token, this.SECRET_KEY);
    if (typeof decoded !== 'string') return (decoded as DecodedToken)['_id'];
    return null;
  }

  async getUser(token: string): Promise<User | never> {
    const userId = this.extractUserId(token)!;
    const foundUser = await this._userRepository.findById(userId);
    if (!foundUser) throw new UnauthorizedError('Expired or invalid token!');

    return foundUser;
  }
}

export const authService = new AuthService(new PrismaUserRepository());
