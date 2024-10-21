import { IUserRepository } from '@application/repositories/shared/IUserRepository.interface';
import { GetUserByIdDto } from './GetUserById.dto';
import { NotFoundError } from 'restify-errors';
import { UserResponseDto } from '@application/repositories/shared/interfaces/UserResponseDto.interface';
import { UserMappers } from '@infra/mappers/UserMappers';

export class GetUserByIdUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(request: GetUserByIdDto): Promise<UserResponseDto | never> {
    const { id } = request;
    const foundUser = await this._userRepository.findById(id);
    if (!foundUser) throw new NotFoundError('User not found!');

    const user: UserResponseDto = UserMappers.toUserResponse(foundUser);
    return user;
  }
}
