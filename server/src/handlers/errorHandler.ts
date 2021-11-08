import { NextFunction, Request, Response } from "express";
import { IHttpError } from "../utils/types";

export default (err: IHttpError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode)
    .send({
      error: err.message
    });
};