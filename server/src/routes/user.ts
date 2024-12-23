import { Router } from "express";
import { getUserHanlder } from "../controllers/user";
import { errorHandler } from "../error-handler";

const userRoutes: Router = Router();

userRoutes.get("/", errorHandler(getUserHanlder));

export default userRoutes;
