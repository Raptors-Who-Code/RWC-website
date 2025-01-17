import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { verifiedMiddleware } from "../middlewares/verified";
import { errorHandler } from "../error-handler";
import { createJobHanlder, deleteJobHandler, getAllJobsHandler } from "../controllers/jobs";

const jobRoutes: Router = Router();

jobRoutes.post(
  "/",
  [authMiddleware, verifiedMiddleware],
  errorHandler(createJobHanlder)
);
jobRoutes.delete(
  "/:id",
  [authMiddleware, verifiedMiddleware],
  errorHandler(deleteJobHandler)
);
jobRoutes.get("/", errorHandler(getAllJobsHandler));

export default jobRoutes; 