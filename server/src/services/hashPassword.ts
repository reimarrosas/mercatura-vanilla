import { IHttpError, IUser, Maybe } from "../utils/types";
import argon2 from "argon2";
import HttpError from "../utils/httpError";

export default async (user: IUser): Promise<IUser> => {
  const hash = await argon2.hash(user.user_password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 14,
    hashLength: 50,
  });

  return {
    user_name: user.user_name,
    user_email: user.user_email,
    user_password: hash,
  };
};
