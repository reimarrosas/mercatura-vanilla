import HttpError from "./httpError";

export default (err: any) => {
  throw new HttpError(500, 'API/Database Error', err.message, err.stack);
};