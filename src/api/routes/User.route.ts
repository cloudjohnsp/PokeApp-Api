import { UserControllerFactory } from '@api/controllers/User/factory/UserController.factory';
import { UserValidator } from '@api/validators/User/user.validators';
import { PrismaUserRepository } from '@infra/repositories/PrismaUserRepository';
import express from 'express';

const userRouter = express.Router();
const userControllerFactory = new UserControllerFactory(
  new PrismaUserRepository()
);

userRouter.get(
  '/get-by-id/:id',
  UserValidator.getByIdValidator,
  userControllerFactory.getById()
);

export default userRouter;
