import { ErrorCode, HttpException } from "./root";

export class BadRequestsException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 400, null);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 409, null);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 404, null);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 401, null);
  }
}
