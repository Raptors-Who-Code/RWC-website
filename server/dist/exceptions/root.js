"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATED = exports.OK = exports.ErrorCode = exports.HttpException = void 0;
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
    ErrorCode["INVALID_VERIFICATION_CODE"] = "INVALID_VERIFICATION_CODE";
    ErrorCode["TOO_MANY_REQUESTS"] = "TOO_MANY_REQUESTS";
    ErrorCode["INVALID_ACCESS_TOKEN"] = "INVALID_ACCESS_TOKEN";
    ErrorCode["SESSION_NOT_FOUND"] = "SESSION_NOT_FOUND";
    ErrorCode["CANNOT_DELETE_CURRENT_SESSION"] = "CANNOT_DELETE_CURRENT_SESSION";
    ErrorCode["MISSING_ENV_VARIABLE"] = "MISSING_ENV_VARIABLE";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
exports.OK = 200;
exports.CREATED = 201;
