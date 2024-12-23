import { Router } from "express";
import { getUserHanlder } from "../controllers/user";
import { errorHandler } from "../error-handler";
import { getSessionHandler } from "../controllers/session";

const sessionRoutes: Router = Router();

sessionRoutes.get("/", errorHandler(getSessionHandler));

export default sessionRoutes;
