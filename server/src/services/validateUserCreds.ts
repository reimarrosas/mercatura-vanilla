import HttpError from "../utils/httpError";
import { IHttpError, IUser, Maybe } from "../utils/types";
import userValidator from "./schemaValidators/userValidator";
import joi from 'joi';

export default async (user: IUser, validator: joi.AnySchema): Promise<IUser> => {
  try {
    const value: IUser = await validator.validateAsync(user);

    return value;
  } catch (err: any) {
    throw new HttpError(400, 'User Validation Error', err.message, err.stack);
  }
}