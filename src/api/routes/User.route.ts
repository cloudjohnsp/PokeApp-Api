import { UserControllerFactory } from '@api/controllers/User/factory/UserController.factory';
import { UserValidator } from '@api/validators/User/user.validators';
import { PrismaUserRepository } from '@infra/repositories/PrismaUserRepository';
import express from 'express';
import { authMiddleware } from '@api/middlewares/Auth';

const userRouter = express.Router();
const userControllerFactory = new UserControllerFactory(
  new PrismaUserRepository()
);

userRouter.use(authMiddleware.handler);

userRouter.get(
  '/get-by-id/:id',
  UserValidator.getByIdValidator,
  userControllerFactory.getById()
);

userRouter.patch(
  '/update-nickname',
  UserValidator.updateValidator,
  userControllerFactory.update()
);

export default userRouter;
