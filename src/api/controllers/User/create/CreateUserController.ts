import { Handler, NextFunction, Request, Response } from 'express';
import { CreateUserUseCase } from '@application/UseCases/User/create/CreateUserUseCase';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle: Handler = async (req: Request, res: Response, next: NextFunction) => {
    const { nickName, email, password } = req.body;

    const newUser = { nickName, email, password };

    try {
      const data = await this.createUserUseCase.execute(newUser);

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  };
}

export { CreateUserController };
