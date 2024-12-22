"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCodeSchema = exports.SignupSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
const emailSchema = zod_1.z.string().email().min(1).max(255);
const passwordSchema = zod_1.z.string().min(6).max(255);
exports.LoginSchema = zod_1.z.object({
    email: emailSchema,
    password: passwordSchema,
    userAgent: zod_1.z.string().optional(),
});
exports.SignupSchema = exports.LoginSchema.extend({
    name: zod_1.z.string().min(3).max(255),
    confirmPassword: zod_1.z.string().min(6).max(255),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
exports.verificationCodeSchema = zod_1.z.string().uuid();
