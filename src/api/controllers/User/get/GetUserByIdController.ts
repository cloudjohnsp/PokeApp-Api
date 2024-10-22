import { GetUserByIdUseCase } from '@application/UseCases/User/get/GetById/GetUserByIdUseCase';
import { Handler, NextFunction, Request, Response } from 'express';

export class GetUserByIdController {
  constructor(private readonly _getUserByIdUseCase: GetUserByIdUseCase) {}

  handle: Handler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const data = await this._getUserByIdUseCase.execute({ id });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}
