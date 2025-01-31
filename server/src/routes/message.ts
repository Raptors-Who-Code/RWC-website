import { Router } from "express";
import { sendMessageHandler } from "../controllers/messages";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";

const messageRoutes: Router = Router();

messageRoutes.post(
  "/send/:id",
  [authMiddleware],
  errorHandler(sendMessageHandler)
);

export default messageRoutes;
