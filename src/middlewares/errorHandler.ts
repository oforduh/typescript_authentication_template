import { INTERNAL_SERVER_ERROR } from "http-status";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError.error";
import { handleDuplicateError } from "../errors/handleDuplicateError.error";

export interface DuplicateKey {
  email?: number | string;
  phonenumber?: number | string;
  username?: number | string;
}

export interface DuplicateErrorException extends Error {
  code?: string | number;
  index?: number;
  keyPattern?: DuplicateKey;
  keyValue?: DuplicateKey;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    // console.log(
    //   "User Error. Status: %o, Error: %o",
    //   err.statusCode,
    //   err.serializeErrors()
    // );
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  if (err.code === 11000) return handleDuplicateError(err, res);

  // console.log(
  //   "Application Error. Message: %o, Stack: %o, Error: %o",
  //   err.message,
  //   err.stack,
  //   err
  // );

  res.status(INTERNAL_SERVER_ERROR).send({
    status: false,
    message: err.message || "Something went wrong",
    // stack: err.stack,
    err: err,
  });
};
