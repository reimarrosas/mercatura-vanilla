import HttpError from "../utils/httpError";
import { IHttpError, IUser, Maybe } from "../utils/types";
import userValidator from "./schemaValidators/userValidator";
import joi from 'joi';

export default async <T extends Object>(user: T, validator: joi.AnySchema): Promise<T> => {
  try {
    const value: T = await validator.validateAsync(user);

    return value;
  } catch (err: any) {
    throw new HttpError(400, 'User Validation Error', err.message, err.stack);
  }
}