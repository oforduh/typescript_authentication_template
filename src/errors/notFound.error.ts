import { NOT_FOUND } from "http-status";
import { CustomError } from "./customError.error";

export class NotFoundError extends CustomError {
  statusCode = NOT_FOUND;

  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return {
      status: false,
      error: { code: this.statusCode, message: this.message },
    };
  }
}
