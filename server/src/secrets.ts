import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const APP_ORIGIN = process.env.APP_ORIGIN;
export const NODE_ENV = process.env.NODE_ENV;
export const EMAIL_SENDER = process.env.EMAIL_SENDER;
export const JWT_SECRET = crypto.randomBytes(32).toString("hex");
export const JWT_REFRESH_SECRET = crypto.randomBytes(32).toString("hex");
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
