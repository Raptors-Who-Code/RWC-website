"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const root_1 = require("./exceptions/root");
const exceptions_1 = require("./exceptions/exceptions");
const cookies_1 = require("./utils/cookies");
const errorHandler = (controller) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.path === cookies_1.REFRESH_PATH) {
            (0, cookies_1.clearAuthCookies)(res);
        }
        try {
            yield controller(req, res, next);
        }
        catch (err) {
            let exception;
            if (err instanceof root_1.HttpException) {
                exception = err;
            }
            else {
                exception = new exceptions_1.InternalException("Something went wrong!", err, root_1.ErrorCode.INTERNALEXCEPTION);
            }
            next(exception);
        }
    });
};
exports.errorHandler = errorHandler;
