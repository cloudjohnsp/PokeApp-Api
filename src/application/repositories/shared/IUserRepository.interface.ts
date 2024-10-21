import { User } from '@domain/Entities/User/User';
import { IRepository } from '@application/repositories/shared/IRepository.interface';

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByNickName(nickName: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
