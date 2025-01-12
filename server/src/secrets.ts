import dotenv from "dotenv";
import { InternalException } from "./exceptions/exceptions";
import { ErrorCode } from "./exceptions/root";

dotenv.config({ path: ".env" });

const getEnvVariable = (key: string) => {
  const value = process.env[key as string];

  if (!value) {
    throw new InternalException(
      `Environment variable "${key}" is not set.`,
      ErrorCode.MISSING_ENV_VARIABLE
    );
  }

  return value;
};

export const PORT = getEnvVariable("PORT");
export const APP_ORIGIN = getEnvVariable("APP_ORIGIN");
export const NODE_ENV = getEnvVariable("NODE_ENV");
export const EMAIL_SENDER = getEnvVariable("EMAIL_SENDER");
export const JWT_SECRET = getEnvVariable("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnvVariable("JWT_REFRESH_SECRET");
export const RESEND_API_KEY = getEnvVariable("RESEND_API_KEY");
export const SUPABASE_URL = getEnvVariable("SUPABASE_URL");
export const SUPABASE_KEY = getEnvVariable("SUPABASE_KEY");
