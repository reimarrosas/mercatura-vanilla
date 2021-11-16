import argon2 from 'argon2';
import HttpError from '../utils/httpError';
import { IUser, Maybe } from '../utils/types';

export default async (dbUser: Maybe<IUser>, passedUser: IUser): Promise<void> => {
  try {
    const res = dbUser && await argon2.verify(dbUser.user_password, passedUser.user_password);
    if (!res) throw new Error();
  } catch (err: any) {
    throw new HttpError(
      409,
      'Password Does Not Match',
      'Invalid user credentials.',
      err.stack
    );
  }
};