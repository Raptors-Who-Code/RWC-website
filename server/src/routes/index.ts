import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import authMiddleware from "../middlewares/auth";
import sessionRoutes from "./session";
import eventRoutes from "./event";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/user", [authMiddleware], userRoutes);
rootRouter.use("/sessions", [authMiddleware], sessionRoutes);
rootRouter.use("/events", eventRoutes);

export default rootRouter;
