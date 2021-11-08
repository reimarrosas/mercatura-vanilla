export interface IHttpError extends Error {
  statusCode: number;
}

export interface IJwtOption {
  expiresIn: string;
}

export interface IPayload {
  userID: number;
  userEmail: string;
}

export enum Token {
  REFRESH = 'REFRESH',
  ACCESS = 'ACCESS'
}

export interface IUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
}

export type Nothing = undefined | null;

export type Maybe<T> = T | Nothing;