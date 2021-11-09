import { NextFunction, Request, Response } from "express";

import verifyToken from "../services/verifyToken";
import HttpError from "../utils/httpError";
import isNothing from "../utils/isNothing";

export default (req: Request, res: Response, next: NextFunction) => {
  const { Auth }: { Auth: string } = req.signedCookies;

  if (isNothing(Auth)) {
    return next (new HttpError(
      401,
      'User Unauthenticated',
      'User is not logged in.'
    ));
  }

  let payload;
  try {
    payload = verifyToken(Auth);
  } catch (err: any) {
    return next(err);
  }

  res.locals.payload = payload;
  next();
};