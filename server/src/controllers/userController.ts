import db from '../database/init';
import HttpError from '../utils/httpError';
import isNothing from '../utils/isNothing';
import { IUser, Maybe } from "../utils/types";

export async function searchUserByEmail(user: IUser): Promise<Maybe<IUser>> {
  let queriedUser: Maybe<IUser>;
  try {
    queriedUser = await db.oneOrNone(`
      SELECT USER_ID, USER_NAME, USER_EMAIL, USER_PASSWORD FROM USERS WHERE USER_EMAIL = $<email>
    `, { email: user.user_email });
  } catch (err: any) {
    throw new HttpError(500, 'API/Database Error', err.message, err.stack);
  }

  return queriedUser;
}

export async function createUser(user: IUser): Promise<void> {
  try {
    await db.none(`
      INSERT INTO USERS (USER_NAME, USER_EMAIL, USER_PASSWORD)
      VALUES ($<name>, $<email>, $<password>);
    `, user);
  } catch(err: any) {
    throw new HttpError(500, 'API/Database Error', err.message, err.stack);
  }
};