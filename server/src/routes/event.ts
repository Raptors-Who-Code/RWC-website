import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import {
  createEventHandler,
  deleteEventHandler,
  getAllEventsHandler,
} from "../controllers/events";
import { verifiedMiddleware } from "../middlewares/verified";
import upload from "../middlewares/upload";

const eventRoutes: Router = Router();

eventRoutes.post(
  "/",
  [authMiddleware, verifiedMiddleware, upload.single("image")],
  errorHandler(createEventHandler)
);
eventRoutes.delete(
  "/:id",
  [authMiddleware, verifiedMiddleware],
  errorHandler(deleteEventHandler)
);
eventRoutes.get("/", errorHandler(getAllEventsHandler));

export default eventRoutes;
