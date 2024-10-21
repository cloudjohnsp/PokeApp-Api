import express from 'express';
import { PrismaUserRepository } from '@infra/repositories/PrismaUserRepository';
import { UserControllerFactory } from '../controllers/User/factory/UserController.factory';
import { UserValidator } from '@api/validators/User/user.validators';

const authRouter = express.Router();
const userControllerFactory = new UserControllerFactory(
  new PrismaUserRepository()
);

authRouter.post(
  '/register',
  UserValidator.createValidation,
  userControllerFactory.create()
);
authRouter.post(
  '/login',
  UserValidator.loginValidator,
  userControllerFactory.login()
);

export default authRouter;
