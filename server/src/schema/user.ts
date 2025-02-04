import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(255);
export const passwordSchema = z.string().min(6).max(255);

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const SignupSchema = LoginSchema.extend({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  confirmPassword: z.string().min(6).max(255),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const verificationCodeSchema = z.string().uuid();

export const resetPasswordSchema = z.object({
  verificationCode: verificationCodeSchema,
  password: passwordSchema,
});

export const resetEmailChangeSchema = z.object({
  verificationCode: verificationCodeSchema,
});

const Gender = z.enum(["MALE", "FEMALE", "NON_BINARY", "UNSPECIFIED"]);

export const updatedUserSchema = z.object({
  emailSchema: emailSchema.optional(),
  firstName: z.string().min(3).max(255).optional(),
  lastName: z.string().min(3).max(255).optional(),
  oldPassword: passwordSchema.optional(),
  password: passwordSchema.optional(),
  confirmPassword: passwordSchema.optional(),
  gender: Gender.optional(),
});
