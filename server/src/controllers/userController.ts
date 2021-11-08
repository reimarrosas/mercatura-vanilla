import db from '../database/init';
import HttpError from '../utils/httpError';
import isNothing from '../utils/isNothing';
import { IUser, Maybe } from "../utils/types";

export async function searchUserByEmail(user: IUser): Promise<number> {
  let id;
  try {
    id = await db.oneOrNone(`
      SELECT USER_ID FROM USERS WHERE USER_EMAIL = $<email>
    `, { email: user.email });
  } catch (err: any) {
    throw new HttpError(500, 'API/Database Error', err.message, err.stack);
  }

  return id;
}

export async function searchUserByCredentials(user: IUser): Promise<Maybe<IUser>> {
  let queriedUser: Maybe<IUser>;

  try {
    queriedUser = await db.oneOrNone<Maybe<IUser>>(`
      SELECT USER_ID, USER_EMAIL, USER_PASSWORD
      FROM USERS
      WHERE USER_EMAIL = $<email>;
    `, { email: user.email });
  } catch (err: any) {
    throw new HttpError(500, 'API/Database Error', err.message, err.stack);
  }

  return queriedUser;
}

export async function createUser(user: IUser): Promise<void> {
  try {
    const id =
      await db.oneOrNone(`
        SELECT USER_ID FROM USERS WHERE USER_EMAIL = $<email>
      `, { email: user.email });

    if (!isNothing(id)) {
      throw new HttpError(
        409,
        'User Already Exists',
        `The desired user email, ${user.email}, already exists.`
      );
    }
    
    await db.none(`
      INSERT INTO USERS (USER_NAME, USER_EMAIL, USER_PASSWORD)
      VALUES ($<name>, $<email>, $<password>);
    `, user);
  } catch(err: any) {
    if (!isNothing(err.statusCode)) {
      throw err;
    }
    throw new HttpError(500, 'API/Database Error', err.message, err.stack);
  }
};