import { searchUserByEmail } from "../controllers/userController";
import HttpError from "../utils/httpError";
import isNothing from "../utils/isNothing";
import { IUser } from "../utils/types";

export default async (user: IUser): Promise<void> => {
  const id = await searchUserByEmail(user);

  if (!isNothing(id)) {
    throw new HttpError(
      409,
      'User Already Exists',
      `The desired user email, ${user.email}, already exists`,
      'pg-promise\n=> searchUserByEmail\n=> checkForExistingUser'
    );
  }
}