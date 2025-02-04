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
exports.resetEmailHandler = exports.sendConfirmationEmailHandler = exports.updateUserHandler = exports.getUserHanlder = void 0;
const root_1 = require("../exceptions/root");
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const user_1 = require("../schema/user");
const base64_arraybuffer_1 = require("base64-arraybuffer");
const userService_1 = require("../services/userService");
const mapRoleToCustomRole_1 = require("../utils/mapRoleToCustomRole");
const cookies_1 = require("../utils/cookies");
const getUserHanlder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield __1.prismaClient.user.findUnique({
        where: { id: req.userId },
    });
    // Do not send password to frontend
    if (!user) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const { password: userPassword } = user, userWithoutPassword = __rest(user, ["password"]);
    return res.status(root_1.OK).json(userWithoutPassword);
});
exports.getUserHanlder = getUserHanlder;
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profilePicFile = req.file;
    let profilePicBase64 = null;
    const user = yield __1.prismaClient.user.findUnique({
        where: { id: req.userId },
    });
    if (!user) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const request = user_1.updatedUserSchema.parse(Object.assign({}, req.body));
    if (profilePicFile) {
        profilePicBase64 = (0, base64_arraybuffer_1.decode)(profilePicFile.buffer.toString("base64"));
    }
    const roleWithCorrectType = (0, mapRoleToCustomRole_1.mapPrismaRoleToCustomRole)(user.role);
    // Need this because Prisma client returns the role as a type of $Enum.Role but we need it of type Role
    const userData = Object.assign(Object.assign({}, user), { role: roleWithCorrectType });
    const updatedUser = yield (0, userService_1.updateUser)(userData, request, profilePicFile, profilePicBase64);
    return res.status(root_1.OK).json(updatedUser);
});
exports.updateUserHandler = updateUserHandler;
// Sends confirmation email to the new email that the user has set as their new email
const sendConfirmationEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmail = user_1.emailSchema.parse(req.body.email);
    const password = req.body.password;
    yield (0, userService_1.sendEmailResetEmail)({ newEmail, password, userId: req.userId });
    return res
        .status(root_1.OK)
        .json({ message: "Confirmation Email has been sent to new email" });
});
exports.sendConfirmationEmailHandler = sendConfirmationEmailHandler;
const resetEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = user_1.resetEmailChangeSchema.parse(req.body);
    yield (0, userService_1.resetEmail)(request);
    return (0, cookies_1.clearAuthCookies)(res)
        .status(root_1.OK)
        .json({ message: "Email reset successful" });
});
exports.resetEmailHandler = resetEmailHandler;
