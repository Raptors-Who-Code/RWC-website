"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESEND_API_KEY = exports.JWT_REFRESH_SECRET = exports.JWT_SECRET = exports.EMAIL_SENDER = exports.NODE_ENV = exports.APP_ORIGIN = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config({ path: ".env" });
exports.PORT = process.env.PORT;
exports.APP_ORIGIN = process.env.APP_ORIGIN;
exports.NODE_ENV = process.env.NODE_ENV;
exports.EMAIL_SENDER = process.env.EMAIL_SENDER;
exports.JWT_SECRET = crypto_1.default.randomBytes(32).toString("hex");
exports.JWT_REFRESH_SECRET = crypto_1.default.randomBytes(32).toString("hex");
exports.RESEND_API_KEY = process.env.RESEND_API_KEY;
