import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import authMiddleware from "../middlewares/auth";
import sessionRoutes from "./session";
import eventRoutes from "./event";
import jobRoutes from "./job";
import messageRoutes from "./message";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/user", [authMiddleware], userRoutes);
rootRouter.use("/sessions", [authMiddleware], sessionRoutes);
rootRouter.use("/events", eventRoutes);
rootRouter.use("/jobs", jobRoutes);
rootRouter.use("/messages", messageRoutes);

export default rootRouter;
