import { Router, Request } from "express";
import {
  login,
  signup,
  logout,
  me,
  refreshHanlder,
  verifyEmailHandler,
  sendPasswordResetHandler,
  resetPasswordHandler,
} from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/login", errorHandler(login));
authRoutes.get("/refresh", errorHandler(refreshHanlder));
authRoutes.get("/logout", [authMiddleware], errorHandler(logout));
authRoutes.get("/email/verify/:code", errorHandler(verifyEmailHandler));
authRoutes.post("/password/forgot", errorHandler(sendPasswordResetHandler));
authRoutes.post("/password/reset", errorHandler(resetPasswordHandler));
// authRoutes.get("/me", [authMiddleware], errorHandler(me));

export default authRoutes;
