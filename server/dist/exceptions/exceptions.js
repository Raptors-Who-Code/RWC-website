"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = exports.NotFoundException = exports.ConflictException = exports.BadRequestsException = void 0;
const root_1 = require("./root");
class BadRequestsException extends root_1.HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 400, null);
    }
}
exports.BadRequestsException = BadRequestsException;
class ConflictException extends root_1.HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 409, null);
    }
}
exports.ConflictException = ConflictException;
class NotFoundException extends root_1.HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 404, null);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends root_1.HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 401, null);
    }
}
exports.UnauthorizedException = UnauthorizedException;
