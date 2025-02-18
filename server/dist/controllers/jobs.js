"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobAPIHandler = exports.getAllJobsHandler = exports.deleteJobHandler = exports.createJobHanlder = void 0;
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const job_1 = require("../schema/job");
const mapRoleToCustomRole_1 = require("../utils/mapRoleToCustomRole");
const jobService_1 = require("../services/jobService");
const jobTypes_1 = require("../types/jobTypes");
const zod_1 = require("zod");
const createJobHanlder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Perform Zod Validation First
    const request = job_1.jobSchema.parse(Object.assign({}, req.body));
    // Make sure user exists
    const user = yield __1.prismaClient.user.findUnique({
        where: { id: req.userId },
    });
    if (!user) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const roleWithCorrectType = (0, mapRoleToCustomRole_1.mapPrismaRoleToCustomRole)(user.role);
    // Need this because Prisma client returns the role as a type of $Enum.Role but we need it of type Role
    const userData = Object.assign(Object.assign({}, user), { role: roleWithCorrectType });
    const jobData = Object.assign(Object.assign({}, request), { userId: user.id, jobLocation: jobTypes_1.JobLocation[request.jobLocation], jobHoursType: jobTypes_1.JobHourTypes[request.jobHoursType], jobLevel: request.jobLevel
            ? jobTypes_1.JobLevel[request.jobLevel]
            : undefined });
    //   Call Service
    const job = yield (0, jobService_1.createJob)(jobData, userData);
    return res.status(root_1.CREATED).json(job);
});
exports.createJobHanlder = createJobHanlder;
const deleteJobHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = zod_1.z.string().parse(req.params.id);
    const userId = req.userId;
    if (!userId) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const deletedJob = yield (0, jobService_1.deleteJob)(jobId, userId);
    return res.status(root_1.DELETED).json({ message: "Job deleted successfully" });
});
exports.deleteJobHandler = deleteJobHandler;
const getAllJobsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield __1.prismaClient.job.findMany();
    return res.status(root_1.OK).json(jobs);
});
exports.getAllJobsHandler = getAllJobsHandler;
const jobAPIHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, jobService_1.fetchAndStoreJobs)();
        res.status(200).json({ message: "Jobs added successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch jobs" });
    }
});
exports.jobAPIHandler = jobAPIHandler;
