import db from '../database/init';
import controllerError from '../utils/controllerError';
import { IUser } from "../utils/types";

export async function searchUserByEmail(user: IUser) {
  try {
    return await db.oneOrNone(`
      SELECT USER_ID, USER_NAME, USER_EMAIL, USER_PASSWORD FROM USERS WHERE USER_EMAIL = $<email>
    `, { email: user.user_email });
  } catch (err: any) {
    controllerError(err);
  }
}

export async function createUser(user: IUser) {
  try {
    await db.none(`
      INSERT INTO USERS (USER_NAME, USER_EMAIL, USER_PASSWORD)
      VALUES ($<user_name>, $<user_email>, $<user_password>);
    `, user);
  } catch(err: any) {
    controllerError(err);
  }
};