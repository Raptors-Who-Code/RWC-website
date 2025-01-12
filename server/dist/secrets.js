"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPABASE_KEY = exports.SUPABASE_URL = exports.RESEND_API_KEY = exports.JWT_REFRESH_SECRET = exports.JWT_SECRET = exports.EMAIL_SENDER = exports.NODE_ENV = exports.APP_ORIGIN = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const exceptions_1 = require("./exceptions/exceptions");
const root_1 = require("./exceptions/root");
dotenv_1.default.config({ path: ".env" });
const getEnvVariable = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new exceptions_1.InternalException(`Environment variable "${key}" is not set.`, root_1.ErrorCode.MISSING_ENV_VARIABLE);
    }
    return value;
};
exports.PORT = getEnvVariable("PORT");
exports.APP_ORIGIN = getEnvVariable("APP_ORIGIN");
exports.NODE_ENV = getEnvVariable("NODE_ENV");
exports.EMAIL_SENDER = getEnvVariable("EMAIL_SENDER");
exports.JWT_SECRET = getEnvVariable("JWT_SECRET");
exports.JWT_REFRESH_SECRET = getEnvVariable("JWT_REFRESH_SECRET");
exports.RESEND_API_KEY = getEnvVariable("RESEND_API_KEY");
exports.SUPABASE_URL = getEnvVariable("SUPABASE_URL");
exports.SUPABASE_KEY = getEnvVariable("SUPABASE_KEY");
