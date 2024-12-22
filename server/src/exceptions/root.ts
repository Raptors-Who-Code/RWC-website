export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  INCORRECT_PASSWORD = "INCORRECT_PASSWORD",
  UNPROCESSABLEENTITY = "UNPROCESSABLEENTITY",
  INTERNALEXCEPTION = "INTERNALEXCEPTION",
  UNAUTHORIZED = "UNAUTHORIZED",
  INVALIDDOMAIN = "INVALIDDOMAIN",
  INVALID_VERIFICATION_CODE = "INVALID_VERIFICATION_CODE",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
}

export const OK = 200;
export const CREATED = 201;
