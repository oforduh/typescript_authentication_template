export interface ErrorArray {
  location?: string;
  reason?: string;
  message?: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    status: boolean;
    error: {
      // ? means optional
      errors?: ErrorArray[];
      code: number;
      message: string;
    };
  };
}
