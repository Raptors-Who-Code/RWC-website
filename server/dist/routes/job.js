"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const verified_1 = require("../middlewares/verified");
const error_handler_1 = require("../error-handler");
const jobs_1 = require("../controllers/jobs");
const jobRoutes = (0, express_1.Router)();
jobRoutes.post("/", [auth_1.default, verified_1.verifiedMiddleware], (0, error_handler_1.errorHandler)(jobs_1.createJobHanlder));
jobRoutes.delete("/:id", [auth_1.default, verified_1.verifiedMiddleware], (0, error_handler_1.errorHandler)(jobs_1.deleteJobHandler));
jobRoutes.get("/", (0, error_handler_1.errorHandler)(jobs_1.getAllJobsHandler));
exports.default = jobRoutes;
