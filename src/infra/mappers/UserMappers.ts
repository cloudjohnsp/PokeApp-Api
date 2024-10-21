import { UserResponseDto } from '@application/repositories/shared/interfaces/UserResponseDto.interface';
import { User } from '@domain/Entities/User/User';

type TUser = {
  id: string;
  nickName: string;
  email: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  password: string;
};

export class UserMappers {
  public static toUserResponse(user: User): UserResponseDto {
    const { id, nickName, email, createdAt, lastUpdatedAt } = user;
    const mappedUser: UserResponseDto = {
      id,
      nickName,
      email,
      createdAt,
      lastUpdatedAt,
    };

    return mappedUser;
  }

  public static toUserEntity(user: TUser): User {
    const { id, nickName, email, password, createdAt, lastUpdatedAt } = user;
    return new User(id, nickName, email, password, createdAt, lastUpdatedAt);
  }
}
