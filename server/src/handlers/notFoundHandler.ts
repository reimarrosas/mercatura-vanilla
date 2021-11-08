import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/httpError";

export default (req: Request, _res: Response, next: NextFunction) => {
  next(new HttpError(
    404,
    "Not Found",
    `${req.originalUrl} not found!`,
    `Method: ${req.method}, URL: ${req.originalUrl}`)
  );
};