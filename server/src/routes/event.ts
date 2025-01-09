import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import {
  createEventHandler,
  deleteEventHandler,
  getAllEventsHandler,
} from "../controllers/events";
import { verifiedMiddleware } from "../middlewares/verified";

const eventRoutes: Router = Router();

eventRoutes.post(
  "/",
  [authMiddleware, verifiedMiddleware],
  errorHandler(createEventHandler)
);
eventRoutes.delete(
  "/:id",
  [authMiddleware, verifiedMiddleware],
  errorHandler(deleteEventHandler)
);
eventRoutes.get("/", errorHandler(getAllEventsHandler));

export default eventRoutes;
