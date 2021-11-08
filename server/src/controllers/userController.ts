import db from '../database/init';
import HttpError from '../utils/httpError';
import { IHttpError, IUser, Maybe } from "../utils/types";

export async function createUser(user: IUser): Promise<Maybe<IHttpError>> {
  try {
    await db.none(`
      INSERT INTO USERS (NAME, EMAIL, PASSWORD)
      VALUES ($<name>, $<email>, $<password>);
    `, user);
  } catch(err: any) {
    return new HttpError(500, 'API/Database Error', err.message, err.stack);
  }

  return Promise.resolve(null);
};