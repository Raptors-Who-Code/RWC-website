import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { createEventHandler, deleteEventHandler } from "../controllers/events";
import { verifiedMiddleware } from "../middlewares/verified";

const eventRoutes: Router = Router();

eventRoutes.post("/", [verifiedMiddleware], errorHandler(createEventHandler));
eventRoutes.delete(
  "/:id",
  [verifiedMiddleware],
  errorHandler(deleteEventHandler)
);

export default eventRoutes;
