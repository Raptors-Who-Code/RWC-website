import { Router } from "express";
import { getUserHanlder, updateUserHandler } from "../controllers/user";
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

export default userRoutes;
