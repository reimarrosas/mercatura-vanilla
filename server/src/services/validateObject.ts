import HttpError from "../utils/httpError";
import joi from 'joi';

export default async <T extends Object>(obj: T, validator: joi.AnySchema): Promise<T> => {
  try {
    const value: T = await validator.validateAsync(obj);

    return value;
  } catch (err: any) {
    throw new HttpError(400, 'Object Validation Error', err.message, err.stack);
  }
}