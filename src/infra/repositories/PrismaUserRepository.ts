import { User } from '@domain/Entities/User/User';
import { IUserRepository } from '@application/repositories/shared/IUserRepository.interface';
import { PrismaClient } from '@prisma/client';
import { UserMappers } from '@infra/mappers/UserMappers';

export class PrismaUserRepository implements IUserRepository {
  private readonly prisma = new PrismaClient();

  async findByEmail(userEmail: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!foundUser) return null;

    return UserMappers.toUserEntity(foundUser);
  }

  async findByNickName(userNickName: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { nickName: userNickName },
    });

    if (!foundUser) return null;

    return UserMappers.toUserEntity(foundUser);
  }
  async findById(userId: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!foundUser) return null;

    return UserMappers.toUserEntity(foundUser);
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        nickName: user.nickName,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        lastUpdatedAt: user.lastUpdatedAt,
      },
    });
  }

  async update(entity: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: entity.id },
      data: {
        nickName: entity.nickName,
        lastUpdatedAt: entity.lastUpdatedAt,
      },
    });
  }
}
