"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    ErrorCode["USER_ALREADY_EXISTS"] = "USER_ALREADY_EXISTS";
    ErrorCode["INCORRECT_PASSWORD"] = "INCORRECT_PASSWORD";
    ErrorCode["UNPROCESSABLEENTITY"] = "UNPROCESSABLEENTITY";
    ErrorCode["INTERNALEXCEPTION"] = "INTERNALEXCEPTION";
    ErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorCode["INVALIDDOMAIN"] = "INVALIDDOMAIN";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
