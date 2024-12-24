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
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const __1 = require("..");
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    if (!token) {
        return next(new exceptions_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
    }
    try {
        const { error, payload } = (0, jwt_1.verifyToken)(token);
        console.log("Payload", payload);
        if (!payload) {
            return next(new exceptions_1.UnauthorizedException(error === "jwt expired" ? "Token expired" : "Invalid token", root_1.ErrorCode.INVALID_ACCESS_TOKEN));
        }
        const user = yield __1.prismaClient.user.findFirst({
            where: { id: payload.userId },
        });
        if (!user) {
            return next(new exceptions_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
        }
        req.userId = payload.userId;
        req.sessionId = payload.sessionId;
        next();
    }
    catch (err) {
        next(new exceptions_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
    }
});
exports.default = authMiddleware;
