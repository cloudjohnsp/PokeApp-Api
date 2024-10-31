import { celebrate, Joi, Segments } from 'celebrate';

export class UserValidator {
  private static readonly PASSWORD_MESSAGE =
    'Password must match case: 1 - At least one lower case letter  2 - at least one upper case letter  3 - at least one special character  4 - at least one number  5 - must have between 8 and 15 characters';

  private static readonly CREATE_VALIDATOR = celebrate({
    [Segments.BODY]: Joi.object({
      nickName: Joi.string().min(5).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
          this.PASSWORD_MESSAGE
        )
        .required(),
    }),
  });

  private static readonly LOGIN_VALIDATOR = celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
          this.PASSWORD_MESSAGE
        )
        .required(),
    }),
  });

  private static readonly GET_BY_ID_VALIDATOR = celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
  });

  private static readonly UPDATE_VALIDATOR = celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.string().required(),
      nickName: Joi.string().min(5).max(20).required(),
    }),
  });

  static get createValidation() {
    return UserValidator.CREATE_VALIDATOR;
  }

  static get loginValidator() {
    return UserValidator.LOGIN_VALIDATOR;
  }

  static get getByIdValidator() {
    return UserValidator.GET_BY_ID_VALIDATOR;
  }

  static get updateValidator() {
    return UserValidator.UPDATE_VALIDATOR;
  }
}
