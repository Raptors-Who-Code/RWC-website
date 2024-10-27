"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleWare = void 0;
const errorMiddleWare = (error, req, res, next) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors,
    });
};
exports.errorMiddleWare = errorMiddleWare;
