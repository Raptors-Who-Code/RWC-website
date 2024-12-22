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
exports.sendMail = void 0;
const resend_1 = __importDefault(require("../config/resend"));
const secrets_1 = require("../secrets");
const getFromEmail = () => {
    if (secrets_1.NODE_ENV === "development") {
        return "onboarding@resend.dev";
    }
    if (!secrets_1.EMAIL_SENDER) {
        throw new Error("EMAIL_SENDER environment variable is not set in production.");
    }
    return secrets_1.EMAIL_SENDER; //TODO: Setup custom domain with valid email
};
const getToEmail = (to) => {
    if (secrets_1.NODE_ENV === "development") {
        return "delivered@resend.dev";
    }
    return to;
};
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, text, html, }) {
    return yield resend_1.default.emails.send({
        from: getFromEmail(),
        to: getToEmail(to),
        subject,
        text,
        html,
    });
});
exports.sendMail = sendMail;
