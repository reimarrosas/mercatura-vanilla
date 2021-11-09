export interface IHttpError extends Error {
  statusCode: number;
}

export interface IJwtOption {
  expiresIn: string;
}

export interface IPayload {
  userID?: string;
  userEmail: string;
}

export enum Token {
  REFRESH = 'REFRESH',
  ACCESS = 'ACCESS'
}

export enum UserExistenceRoute {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP'
}

export interface IUser {
  user_id?: string;
  user_name?: string;
  user_email: string;
  user_password: string;
}

export type Nothing = undefined | null;

export type Maybe<T> = T | Nothing;