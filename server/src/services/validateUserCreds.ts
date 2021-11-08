import HttpError from "../utils/httpError";
import { IHttpError, IUser, Maybe } from "../utils/types";
import userValidator from "./schemaValidators/userValidator";

export default async (user: IUser): Promise<Maybe<IHttpError>> => {
  try {
    const value = await userValidator.validateAsync(user);
  } catch (err: any) {
    return new HttpError(400, 'User Validation Error', err.message, err.stack);
  }

  return Promise.resolve(null);
}