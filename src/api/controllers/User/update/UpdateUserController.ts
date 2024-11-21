import { UserResponseDto } from '@application/repositories/shared/interfaces/UserResponseDto.interface';
import { UpdateUserUseCase } from '@application/UseCases';
import { Handler, NextFunction, Request, Response } from 'express';

export class UpdateUserController {
  constructor(private _updateUserUseCase: UpdateUserUseCase) {}

  handle: Handler = async (req: Request, res: Response, next: NextFunction) => {
    const { id, nickName } = req.body;
    try {
      const data: UserResponseDto = await this._updateUserUseCase.execute({
        id,
        nickName,
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}
