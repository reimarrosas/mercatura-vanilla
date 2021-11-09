import { searchUserByEmail } from "../controllers/userController";
import HttpError from "../utils/httpError";
import { IUser, Maybe, UserExistenceRoute } from "../utils/types";

export default async (user: IUser, routeType: UserExistenceRoute): Promise<Maybe<IUser>> => {
  const queriedUser = await searchUserByEmail(user);

  if (queriedUser?.user_email && routeType === UserExistenceRoute.SIGNUP) {
    throw new HttpError(
      406,
      'User Already Exists',
      `The desired user email, ${user.user_email}, already exists.`
    );
  } else if (!queriedUser?.user_email && routeType === UserExistenceRoute.LOGIN) {
    throw new HttpError(
      406,
      'User Does Not Exist',
      `The desired user, ${user.user_email}, does not yet exist.`
    );
  }

  return queriedUser;
}