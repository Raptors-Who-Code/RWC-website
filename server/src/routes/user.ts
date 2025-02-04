import { Router } from "express";
import {
  getUserHanlder,
  resetEmailHandler,
  sendConfirmationEmailHandler,
  updateUserHandler,
} from "../controllers/user";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import upload from "../middlewares/upload";

const userRoutes: Router = Router();

userRoutes.get("/", errorHandler(getUserHanlder));

userRoutes.patch(
  "/",
  [authMiddleware, upload.single("image")],
  errorHandler(updateUserHandler)
);
userRoutes.post(
  "/email/change",
  [authMiddleware],
  errorHandler(sendConfirmationEmailHandler)
); //Gets triggered once the user has request an email change
userRoutes.post(
  "/email/reset",
  [authMiddleware],
  errorHandler(resetEmailHandler)
); // Gets triggered once the user has confirmed the email change

export default userRoutes;
