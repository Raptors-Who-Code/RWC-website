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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.sendPasswordResetEmail = exports.verifyEmail = exports.refreshUserAccessToken = exports.loginUser = exports.createAccount = void 0;
const bcrypt_1 = require("bcrypt");
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const date_1 = require("../utils/date");
const client_1 = require("@prisma/client");
const jwt_1 = require("../utils/jwt");
const emailTemplates_1 = require("../utils/emailTemplates");
const sendMail_1 = require("../utils/sendMail");
const createAccount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield __1.prismaClient.user.findFirst({
        where: { email: data.email },
    });
    if (existingUser) {
        throw new exceptions_1.ConflictException("User already exists", root_1.ErrorCode.USER_ALREADY_EXISTS);
    }
    const { name, email, password, userAgent } = data;
    // Create User
    const user = yield __1.prismaClient.user.create({
        data: {
            name: name,
            email: email,
            password: (0, bcrypt_1.hashSync)(password, 10),
            verified: false,
        },
    });
    // Create Verification Code
    const verificationCode = yield __1.prismaClient.verificationCode.create({
        data: {
            userId: user.id,
            type: client_1.VerificationCodeType.EMAIL_VERIFICATION,
            expiresAt: (0, date_1.oneYearFromNow)(),
        },
    });
    const url = `${secrets_1.APP_ORIGIN}/verify-email/${verificationCode.id}`;
    // Send verification email
    try {
        yield (0, sendMail_1.sendMail)(Object.assign({ to: user.email }, (0, emailTemplates_1.getVerifyEmailTemplate)(url)));
    }
    catch (error) {
        console.log(error);
    }
    // create session
    const session = yield __1.prismaClient.session.create({
        data: {
            userId: user.id,
            userAgent: userAgent,
        },
    });
    // sign access token and refresh token
    const refreshToken = jsonwebtoken_1.default.sign({ sessionId: session.id }, secrets_1.JWT_REFRESH_SECRET, {
        audience: ["user"],
        expiresIn: "30d",
    });
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, sessionId: session.id }, secrets_1.JWT_SECRET, {
        audience: ["user"],
        expiresIn: "15m",
    });
    // return user and tokens
    // Do not return password with user object
    const { password: userPassword } = user, userWithoutPassword = __rest(user, ["password"]);
    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
    };
});
exports.createAccount = createAccount;
const loginUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, userAgent, }) {
    // get the user by email
    const user = yield __1.prismaClient.user.findFirst({
        where: { email },
    });
    if (!user) {
        throw new exceptions_1.NotFoundException("Invalid email or password", root_1.ErrorCode.USER_NOT_FOUND);
    }
    // validate password from the request
    if (!(0, bcrypt_1.compareSync)(password, user.password)) {
        throw new exceptions_1.UnauthorizedException("Invalid email or password", root_1.ErrorCode.INCORRECT_PASSWORD);
    }
    const userId = user.id;
    // create a session
    const session = yield __1.prismaClient.session.create({
        data: {
            userId: userId,
            userAgent: userAgent,
        },
    });
    const sessionInfo = { sessionId: session.id };
    // sign access token and refresh token
    const refreshToken = (0, jwt_1.signToken)(sessionInfo, jwt_1.refreshTokenSignOptions);
    const accessToken = (0, jwt_1.signToken)(Object.assign(Object.assign({}, sessionInfo), { userId: user.id }));
    // return user and tokens
    //Do not return password with user object
    const { password: userPassword } = user, userWithoutPassword = __rest(user, ["password"]);
    return { user: userWithoutPassword, accessToken, refreshToken };
});
exports.loginUser = loginUser;
const refreshUserAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = (0, jwt_1.verifyToken)(refreshToken, {
        secret: jwt_1.refreshTokenSignOptions.secret,
    });
    if (!payload) {
        throw new exceptions_1.UnauthorizedException("Invalid refresh token", root_1.ErrorCode.UNAUTHORIZED);
    }
    const session = yield __1.prismaClient.session.findUnique({
        where: { id: payload.sessionId },
    });
    const now = Date.now();
    if (!session || session.expiresAt.getTime() < now) {
        throw new exceptions_1.UnauthorizedException("Session Expired", root_1.ErrorCode.UNAUTHORIZED);
    }
    // refresh the token if it expires in the next 24 hours
    const sessionNeedsRefresh = session.expiresAt.getTime() - now <= date_1.ONE_DAY_IN_MS;
    if (sessionNeedsRefresh) {
        session.expiresAt = (0, date_1.thirtyDaysFromNow)();
        yield __1.prismaClient.session.update({
            where: { id: session.id },
            data: { expiresAt: session.expiresAt },
        });
    }
    const newRefreshToken = sessionNeedsRefresh
        ? (0, jwt_1.signToken)({ sessionId: session.id }, jwt_1.refreshTokenSignOptions)
        : undefined;
    const accessToken = (0, jwt_1.signToken)({
        userId: session.userId,
        sessionId: session.id,
    });
    return { accessToken, newRefreshToken };
});
exports.refreshUserAccessToken = refreshUserAccessToken;
const verifyEmail = (code) => __awaiter(void 0, void 0, void 0, function* () {
    // get the verification code
    const validCode = yield __1.prismaClient.verificationCode.findFirst({
        where: {
            id: code,
            type: client_1.VerificationCodeType.EMAIL_VERIFICATION,
            expiresAt: { gt: new Date() },
        },
    });
    if (!validCode) {
        throw new exceptions_1.UnauthorizedException("Invalid verification code", root_1.ErrorCode.INVALID_VERIFICATION_CODE);
    }
    // update user to verified true
    const updatedUser = yield __1.prismaClient.user.update({
        where: { id: validCode.userId },
        data: { verified: true },
    });
    if (!updatedUser) {
        throw new exceptions_1.InternalException("Failed to verify email", root_1.ErrorCode.INTERNALEXCEPTION);
    }
    // delete verification code
    yield __1.prismaClient.verificationCode.delete({ where: { id: code } });
    // return user
    //Do not return password with user object
    const { password: userPassword } = updatedUser, userWithoutPassword = __rest(updatedUser, ["password"]);
    return { user: userWithoutPassword };
});
exports.verifyEmail = verifyEmail;
const sendPasswordResetEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user by email
    const user = yield __1.prismaClient.user.findFirst({
        where: { email },
    });
    if (!user) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    // check email rate limit
    const fiveMinAgo = (0, date_1.fiveMinutesAgo)();
    const count = yield __1.prismaClient.verificationCode.count({
        where: {
            userId: user.id,
            type: client_1.VerificationCodeType.PASSWORD_RESET,
            createdAt: { gte: fiveMinAgo },
        },
    });
    if (!(count <= 1)) {
        throw new exceptions_1.TooManyRequestsException("Too many requests, please try again later", root_1.ErrorCode.TOO_MANY_REQUESTS);
    }
    // create verification code
    const expiresAt = (0, date_1.oneHourFromNow)();
    const verificationCode = yield __1.prismaClient.verificationCode.create({
        data: {
            userId: user.id,
            type: client_1.VerificationCodeType.PASSWORD_RESET,
            expiresAt,
        },
    });
    // send verification email
    const url = `${secrets_1.APP_ORIGIN}/password/reset?code=${verificationCode.id}&exp=${expiresAt.getTime()}`;
    const { data, error } = yield (0, sendMail_1.sendMail)(Object.assign({ to: user.email }, (0, emailTemplates_1.getPasswordResetTemplate)(url)));
    if (!(data === null || data === void 0 ? void 0 : data.id)) {
        throw new exceptions_1.InternalException(`${error === null || error === void 0 ? void 0 : error.name} - ${error === null || error === void 0 ? void 0 : error.message}`, root_1.ErrorCode.INTERNALEXCEPTION);
    }
    // return success message
    return { url, emailId: data.id };
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const resetPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ password, verificationCode, }) {
    // get verification code
    const validCode = yield __1.prismaClient.verificationCode.findFirst({
        where: {
            id: verificationCode,
            type: client_1.VerificationCodeType.PASSWORD_RESET,
            expiresAt: { gt: new Date() },
        },
    });
    if (!validCode) {
        throw new exceptions_1.UnauthorizedException("Invalid verification code", root_1.ErrorCode.INVALID_VERIFICATION_CODE);
    }
    // update users password
    const updatedUser = yield __1.prismaClient.user.update({
        where: { id: validCode.userId },
        data: { password: (0, bcrypt_1.hashSync)(password, 10) },
    });
    if (!updatedUser) {
        throw new exceptions_1.InternalException("Failed to reset password", root_1.ErrorCode.INTERNALEXCEPTION);
    }
    // delete the verification code
    yield __1.prismaClient.verificationCode.delete({
        where: { id: verificationCode },
    });
    // delete all sessions
    yield __1.prismaClient.session.deleteMany({
        where: { userId: updatedUser.id },
    });
    // Do not return user's password
    const { password: userPassword } = updatedUser, userWithoutPassword = __rest(updatedUser, ["password"]);
    return { user: userWithoutPassword };
});
exports.resetPassword = resetPassword;
