import { UNAUTHORIZED } from "http-status";

import { CustomError } from "./customError.error";

export class NotAuthorizedError extends CustomError {
  statusCode: number = UNAUTHORIZED;

  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return {
      status: false,
      error: {
        code: this.statusCode,
        message: this.message,
      },
    };
  }
}
