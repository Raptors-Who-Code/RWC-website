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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = void 0;
const bcrypt_1 = require("bcrypt");
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const createAccount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield __1.prismaClient.user.findFirst({
        where: { email: data.email },
    });
    if (existingUser) {
        throw new exceptions_1.ConflictException("User already exists", root_1.ErrorCode.USER_ALREADY_EXISTS);
    }
    const { name, email, password, userAgent } = data;
    const user = yield __1.prismaClient.user.create({
        data: {
            name: name,
            email: email,
            password: (0, bcrypt_1.hashSync)(password, 10),
            verified: false,
        },
    });
    //TODO: Send verification email
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
    return {
        user,
        accessToken,
        refreshToken,
    };
});
exports.createAccount = createAccount;
