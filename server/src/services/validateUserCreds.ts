import HttpError from "../utils/httpError";
import { IUser, Maybe } from "../utils/types";
import userValidator from "./inputValidators/userValidator";

export default async (user: IUser): Promise<Maybe<HttpError>> => {
  try {
    const value = await userValidator.validateAsync(user);
    console.log(value);
  } catch (err: any) {
    return new HttpError(400, 'User Validation Error', err.message, err.stack);
  }

  return Promise.resolve(null);
}