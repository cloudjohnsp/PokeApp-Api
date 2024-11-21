import { IUserRepository } from '@application/repositories/shared/IUserRepository.interface';
import { UpdateUserRequestDto } from './UpdateUser.dto';
import { User } from '@domain/Entities/User/User';
import { NotFoundError } from 'restify-errors';
import { UserResponseDto } from '@application/repositories/shared/interfaces/UserResponseDto.interface';

export class UpdateUserUseCase {
  constructor(private _userRepository: IUserRepository) {}

  async execute(request: UpdateUserRequestDto): Promise<UserResponseDto> {
    const user: User | null = await this._userRepository.findById(request.id);
    if (!user) {
      throw new NotFoundError(
        `User with id: ${request.id} not does not exists!`
      );
    }

    user.nickName = request.nickName;
    user.lastUpdatedAt = new Date();

    await this._userRepository.update(user);

    return {
      id: user.id,
      nickName: user.nickName,
      email: user.email,
      createdAt: user.createdAt,
      lastUpdatedAt: user.lastUpdatedAt,
    };
  }
}
