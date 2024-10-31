import { Handler } from 'express';
import {
  LoginUserController,
  CreateUserController,
  GetUserByIdController,
  UpdateUserController,
} from '..';
import {
  LoginUserUseCase,
  CreateUserUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from '@application/UseCases';
import { IUserRepository } from '@application/repositories/shared/IUserRepository.interface';

export class UserControllerFactory {
  constructor(private readonly repository: IUserRepository) {}

  create(): Handler {
    const createUserUseCase = new CreateUserUseCase(this.repository);
    return new CreateUserController(createUserUseCase).handle;
  }

  login(): Handler {
    const loginUserUseCase = new LoginUserUseCase(this.repository);
    return new LoginUserController(loginUserUseCase).handle;
  }

  getById(): Handler {
    const getUserByIdUseCase = new GetUserByIdUseCase(this.repository);
    return new GetUserByIdController(getUserByIdUseCase).handle;
  }

  update(): Handler {
    const updateUserUseCase = new UpdateUserUseCase(this.repository);
    return new UpdateUserController(updateUserUseCase).handle;
  }
}
