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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailHandler = exports.refreshHanlder = exports.me = exports.logout = exports.login = exports.signup = void 0;
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const user_1 = require("../schema/user");
const authService_1 = require("../services/authService");
const cookies_1 = require("../utils/cookies");
const jwt_1 = require("../utils/jwt");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = user_1.SignupSchema.parse(Object.assign(Object.assign({}, req.body), { userAgent: req.headers["user-agent"] })); // Perform Zod Validation First
    // call service
    const { user, accessToken, refreshToken } = yield (0, authService_1.createAccount)(request);
    // return response
    return (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken })
        .status(root_1.CREATED)
        .json(user);
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Perform Zod Validation First
    const request = user_1.LoginSchema.parse(Object.assign(Object.assign({}, req.body), { userAgent: req.headers["user-agent"] }));
    // call service
    const { accessToken, refreshToken } = yield (0, authService_1.loginUser)(request);
    // return response
    return (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken })
        .status(root_1.OK)
        .json({ message: "Login Sucessful" });
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.accessToken;
    const { payload } = (0, jwt_1.verifyToken)(accessToken || "");
    if (!accessToken) {
        return res.status(401).json({ message: "Access token not provided" });
    }
    // If there is a valid token delete that user's session
    if (payload) {
        yield __1.prismaClient.session.delete({ where: { id: payload.sessionId } });
    }
    return (0, cookies_1.clearAuthCookies)(res)
        .status(root_1.OK)
        .json({ message: "Logout successful" });
});
exports.logout = logout;
const me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new exceptions_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED);
    }
    const _a = req.user, { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
    // Do not send back hashed password back to frontend
    res.json(userWithoutPassword);
});
exports.me = me;
const refreshHanlder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new exceptions_1.UnauthorizedException("Missing refresh Token", root_1.ErrorCode.UNAUTHORIZED);
    }
    const { accessToken, newRefreshToken } = yield (0, authService_1.refreshUserAccessToken)(refreshToken);
    if (newRefreshToken) {
        res.cookie("refreshToken", newRefreshToken, (0, cookies_1.getRefreshTokenCookieOptions)());
    }
    return res
        .status(root_1.OK)
        .cookie("accessToken", accessToken, (0, cookies_1.getAccessTokenCookieOptions)())
        .json({ message: "Access token refreshed" });
});
exports.refreshHanlder = refreshHanlder;
const verifyEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationCode = user_1.verificationCodeSchema.parse(req.params.code);
    yield (0, authService_1.verifyEmail)(verificationCode);
    return res.status(root_1.OK).json({ message: "Email was successfully verified" });
});
exports.verifyEmailHandler = verifyEmailHandler;
