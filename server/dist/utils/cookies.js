"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookies = exports.setAuthCookies = exports.REFRESH_PATH = void 0;
const date_1 = require("./date");
exports.REFRESH_PATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";
const defaults = {
    sameSite: "strict",
    httpOnly: true,
    secure: true,
};
const getAccessTokenCookieOptions = () => (Object.assign(Object.assign({}, defaults), { expires: (0, date_1.fifteenMinutesFromNow)() }));
const getRefreshTokenCookieOptions = () => (Object.assign(Object.assign({}, defaults), { expires: (0, date_1.thirtyDaysFromNow)(), path: exports.REFRESH_PATH }));
const setAuthCookies = ({ res, accessToken, refreshToken }) => res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
exports.setAuthCookies = setAuthCookies;
const clearAuthCookies = (res) => res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: exports.REFRESH_PATH,
});
exports.clearAuthCookies = clearAuthCookies;
