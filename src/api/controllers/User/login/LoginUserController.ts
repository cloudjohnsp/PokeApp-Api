import { LoginUserUseCase } from '@application/UseCases/User/login/LoginUserUseCase';
import { Handler, NextFunction, Request, Response } from 'express';

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  handle: Handler = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const authUser = { email, password };

    try {
      const data = await this.loginUserUseCase.execute(authUser);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}
