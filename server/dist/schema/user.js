"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(6).max(255),
    email: zod_1.z.string().email().min(1).max(255),
    password: zod_1.z.string().min(6).max(255),
    confirmPassword: zod_1.z.string().min(6).max(255),
    userAgent: zod_1.z.string().optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
