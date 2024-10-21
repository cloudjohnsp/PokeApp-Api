import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { UserMappers } from '@infra/mappers/UserMappers';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { LoginRequestDto, LoginResponseDto } from './LoginUser.dto';
import { IUserRepository } from '@application/repositories/shared/IUserRepository.interface';
import { UserResponseDto } from '@application/repositories/shared/interfaces/UserResponseDto.interface';

export class LoginUserUseCase {
  constructor(private _userRepository: IUserRepository) {}

  async execute(request: LoginRequestDto): Promise<LoginResponseDto | never> {
    const { email, password } = request;
    const foundUser = await this._userRepository.findByEmail(email);

    if (!foundUser)
      throw new NotFoundError(`User with email: ${email} does not exists!`);

    const isMatchPassword = bcrypt.compareSync(password, foundUser.password);

    const payload = { _id: foundUser.id, email: foundUser.email };
    const secretKey: Secret = process.env.SECRET_KEY!;

    if (isMatchPassword) {
      const token: string = jwt.sign(payload, secretKey, { expiresIn: '12h' });
      const user: UserResponseDto = UserMappers.toUserResponse(foundUser);
      const result: LoginResponseDto = { user, token };
      return result;
    } else {
      throw new BadRequestError('Password is not correct!');
    }
  }
}
