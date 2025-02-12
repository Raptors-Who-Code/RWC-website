import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { verifiedMiddleware } from "../middlewares/verified";
import { errorHandler } from "../error-handler";
import { createJobHanlder, deleteJobHandler, getAllJobsHandler } from "../controllers/jobs";
import { fetchAndStoreJobs } from "../services/jobService";

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

jobRoutes.get("/fetch", errorHandler(fetchAndStoreJobs));

export default jobRoutes; 