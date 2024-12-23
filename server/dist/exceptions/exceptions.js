"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.TooManyRequestsException = exports.InternalException = exports.UnauthorizedException = exports.NotFoundException = exports.ConflictException = exports.BadRequestsException = void 0;
const root_1 = require("./root");
class BadRequestsException extends root_1.HttpException {
    constructor(message, errorCode, errors) {
        super(message, errorCode, 400, errors);
    }
}
exports.BadRequestsException = BadRequestsException;
class ConflictException extends root_1.HttpException {
    constructor(message, errorCode, errors) {
        super(message, errorCode, 409, errors);
    }
}
exports.ConflictException = ConflictException;
class NotFoundException extends root_1.HttpException {
    constructor(message, errorCode, errors) {
        super(message, errorCode, 404, errors);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends root_1.HttpException {
    constructor(message, errorCode, errors) {
        super(message, errorCode, 401, errors);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class InternalException extends root_1.HttpException {
    constructor(message, errorCode, errors) {
        super(message, errorCode, 500, errors);
    }
}
exports.InternalException = InternalException;
class TooManyRequestsException extends root_1.HttpException {
    constructor(message, errorCode, errors) {
        super(message, errorCode, 429, errors);
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
class ForbiddenException extends root_1.HttpException {
    constructor(message, errorCode, errors) {
        super(message, errorCode, 403, errors);
    }
}
exports.ForbiddenException = ForbiddenException;
