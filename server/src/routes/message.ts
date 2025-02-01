import { Router } from "express";
import {
  getMessagesHandler,
  getUsersForSidebarHandler,
  sendMessageHandler,
} from "../controllers/messages";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";

const messageRoutes: Router = Router();

// Make sure this one is the first route to avoid collision with other get route
messageRoutes.get(
  "/conversations",
  [authMiddleware],
  errorHandler(getUsersForSidebarHandler)
);

messageRoutes.get("/:id", [authMiddleware], errorHandler(getMessagesHandler));

messageRoutes.post(
  "/send/:id",
  [authMiddleware],
  errorHandler(sendMessageHandler)
);

export default messageRoutes;
