import HttpError from "../utils/httpError";
import { IHttpError, IUser, Maybe } from "../utils/types";
import userValidator from "./schemaValidators/userValidator";

export default async (user: IUser): Promise<void> => {
  try {
    await userValidator.validateAsync(user);
  } catch (err: any) {
    throw new HttpError(400, 'User Validation Error', err.message, err.stack);
  }
}