"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedUserSchema = exports.resetPasswordSchema = exports.verificationCodeSchema = exports.SignupSchema = exports.LoginSchema = exports.passwordSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z.string().email().min(1).max(255);
exports.passwordSchema = zod_1.z.string().min(6).max(255);
exports.LoginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: exports.passwordSchema,
    userAgent: zod_1.z.string().optional(),
});
exports.SignupSchema = exports.LoginSchema.extend({
    firstName: zod_1.z.string().min(3).max(255),
    lastName: zod_1.z.string().min(3).max(255),
    confirmPassword: zod_1.z.string().min(6).max(255),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
exports.verificationCodeSchema = zod_1.z.string().uuid();
exports.resetPasswordSchema = zod_1.z.object({
    verificationCode: exports.verificationCodeSchema,
    password: exports.passwordSchema,
});
exports.updatedUserSchema = zod_1.z.object({
    emailSchema: exports.emailSchema.optional(),
    firstName: zod_1.z.string().min(3).max(255).optional(),
    lastName: zod_1.z.string().min(3).max(255).optional(),
    oldPassword: exports.passwordSchema.optional(),
    password: exports.passwordSchema.optional(),
    confirmPassword: exports.passwordSchema.optional(),
});
