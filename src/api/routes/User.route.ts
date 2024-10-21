import express from 'express';
import { PrismaUserRepository } from '@infra/repositories/PrismaUserRepository';
import { UserControllerFactory } from '../controllers/User/factory/UserController.factory';
import { UserValidator } from '@api/validators/User/user.validators';

const userRouter = express.Router();
const userControllerFactory = new UserControllerFactory(
  new PrismaUserRepository()
);

userRouter.post(
  '/register',
  UserValidator.createValidation,
  userControllerFactory.create()
);
userRouter.post(
  '/login',
  UserValidator.loginValidator,
  userControllerFactory.login()
);

export default userRouter;
