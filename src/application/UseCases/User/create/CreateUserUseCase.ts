import bcrypt from 'bcrypt';
import 'dotenv/config';
import { ConflictError } from 'restify-errors';
import { CreateUserRequestDto } from '@application/UseCases/User/create/CreateUser.dto';
import { User } from '@domain/Entities/User/User';
import { UserMappers } from '@infra/mappers/UserMappers';
import { IUserRepository } from '@application/repositories/shared/IUserRepository.interface';
import { UserResponseDto } from '@application/repositories/shared/interfaces/UserResponseDto.interface';

export class CreateUserUseCase {
  constructor(private _userRepository: IUserRepository) {}

  private async userExists(
    nickName: string,
    email: string
  ): Promise<void | never> {
    if ((await this._userRepository.findByNickName(nickName)) !== null)
      throw new ConflictError(
        `User with nickName: ${nickName}, already exists!`
      );

    if ((await this._userRepository.findByEmail(email)) !== null)
      throw new ConflictError(`User with email: ${email}, already exists!`);
  }

  async execute(request: CreateUserRequestDto): Promise<UserResponseDto> {
    const { nickName, email, password } = request;

    await this.userExists(nickName, email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = User.create(nickName, email, hashedPassword);

    await this._userRepository.create(newUser);

    return UserMappers.toUserResponse(newUser);
  }
}
