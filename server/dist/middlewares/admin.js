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
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return next(new exceptions_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
    }
    const user = yield __1.prismaClient.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        return next(new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND));
    }
    if (user.role == "ADMIN") {
        next();
    }
    else {
        next(new exceptions_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
    }
});
exports.default = adminMiddleware;
