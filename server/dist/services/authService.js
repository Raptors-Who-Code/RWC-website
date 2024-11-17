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
exports.sendOTPVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let transporter = nodemailer_1.default.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});
const sendOTPVerificationEmail = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ _id, email }, res) {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Welcome to Raptors Who Code! Please Verify Your Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete registration!</p> 
      <p>This code <b>expires in 1 hour</b></p>
      `,
        };
        const saltRounds = 10;
        const hashedOTP = yield bcrypt_1.default.hash(otp, saltRounds);
        // Save OTP to database
        yield prismaClient.OTPVerification.create({
            data: {
                userId: _id,
                otp: hashedOTP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 360000,
            },
        });
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD,
            },
        });
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error(error);
    }
});
exports.sendOTPVerificationEmail = sendOTPVerificationEmail;
