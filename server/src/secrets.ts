import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const JWT_SECRET = crypto.randomBytes(32).toString("hex");
export const JWT_REFRESH_SECRET = crypto.randomBytes(32).toString("hex");
