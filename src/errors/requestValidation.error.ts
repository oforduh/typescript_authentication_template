import { BAD_REQUEST } from "http-status";
import { ValidationError } from "express-validator";

import { CustomError } from "./customError.error";

export class RequestValidationError extends CustomError {
  statusCode = BAD_REQUEST;

  _errors = this.errors.map((error) => {
    return { reason: error.msg, location: error.param };
  });

  constructor(public errors: ValidationError[]) {
    super("validation error");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return {
      status: false,
      error: {
        errors: this._errors,
        message: this.message,
        code: this.statusCode,
      },
    };
  }
}
