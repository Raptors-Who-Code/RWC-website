import API from "@/config/apiClient";
import { emailSchema, LoginSchema, SignupSchema } from "@/schema/auth.schema";
import { z } from "zod";

export enum Role {
  ADMIN,
  MODERATOR,
  MEMBER,
  GUEST,
  ALUMNI,
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NON_BINARY = "NON_BINARY",
  UNSPECIFIED = "UNSPECIFIED",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  biography: string | null;
  email: string;
  verified: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  gender: Gender;
  profilePicUrl: string;
  conversationIds: string[];
  latitude: number | null;
  longitude: number | null;
  customProfilePic: boolean;
}

export type LoginFormFields = z.infer<typeof LoginSchema>;

export const login = async (data: LoginFormFields): Promise<User> =>
  API.post("/api/auth/login", data);

export const logUserOut = async () => API.get("/api/auth/logout");

export type SignUpFormFields = z.infer<typeof SignupSchema>;

export const signup = async (data: SignUpFormFields): Promise<User> =>
  API.post("/api/auth/signup", data);

export const verifiyEmail = async (verificationCode: string) =>
  API.get(`/api/auth/email/verify/${verificationCode}`);

export type EmailFormFields = z.infer<typeof emailSchema>;

export const sendPasswordResetEmail = async (email: EmailFormFields) =>
  API.post(`/api/auth/password/forgot`, { email });

export type ResetPasswordFields = {
  verificationCode: string;
  newPassword: string;
};

export const resetPassword = async ({
  verificationCode,
  newPassword,
}: ResetPasswordFields) => {
  API.post("/api/auth/password/reset", {
    verificationCode,
    password: newPassword,
  });
};
