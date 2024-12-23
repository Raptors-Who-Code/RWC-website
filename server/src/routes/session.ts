import { Router } from "express";
import { getUserHanlder } from "../controllers/user";
import { errorHandler } from "../error-handler";
import {
  deleteSessionHandler,
  getSessionHandler,
} from "../controllers/session";

const sessionRoutes: Router = Router();

sessionRoutes.get("/", errorHandler(getSessionHandler));
sessionRoutes.delete("/:id", errorHandler(deleteSessionHandler));

export default sessionRoutes;
