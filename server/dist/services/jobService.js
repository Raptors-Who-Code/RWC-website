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
exports.fetchAndStoreJobs = exports.fetchJobsFromAPI = exports.deleteJob = exports.createJob = void 0;
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const createJob = (jobData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, jobLink, internship, jobLocation, jobHoursType, jobLevel } = jobData;
    const job = yield __1.prismaClient.job.create({
        data: Object.assign({ title,
            content,
            jobLink,
            internship,
            jobLocation,
            jobHoursType, userId: userData.id }, (jobLevel && { jobLevel }))
    });
    return job;
});
exports.createJob = createJob;
const deleteJob = (jobId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield __1.prismaClient.job.findUnique({ where: {
            id: jobId
        } });
    if (!job) {
        throw new exceptions_1.NotFoundException("Job not found", root_1.ErrorCode.JOB_NOT_FOUND);
    }
    const user = yield __1.prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const isUsersJob = job.userId == userId;
    const isUserAdmin = user.role == "ADMIN";
    if (!isUsersJob && !isUserAdmin) {
        throw new exceptions_1.NotFoundException("You are not authorized to delete this job", root_1.ErrorCode.UNAUTHORIZED);
    }
    const deletedJob = yield __1.prismaClient.job.delete({
        where: {
            id: jobId
        },
    });
    if (!deletedJob) {
        throw new exceptions_1.NotFoundException("Job not found", root_1.ErrorCode.JOB_NOT_FOUND);
    }
    return deletedJob;
});
exports.deleteJob = deleteJob;
const fetchJobsFromAPI = (numberOfJobs) => __awaiter(void 0, void 0, void 0, function* () {
    const apiUrl = "https://api.github.com/repos/cvrve/Summer2025-Internships/contents/.github/scripts/listings.json?ref=dev";
    try {
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const metadata = yield response.json();
        const downloadUrl = metadata.download_url;
        const jsonResponse = yield fetch(downloadUrl);
        const jsonData = yield jsonResponse.json(); // returns json file containing over 3000 unique job objects 
        return jsonData.slice(0, numberOfJobs);
    }
    catch (err) {
        console.error("Error fetching the JSON file:", err);
    }
    return;
});
exports.fetchJobsFromAPI = fetchJobsFromAPI;
const fetchAndStoreJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield (0, exports.fetchJobsFromAPI)(20); // parameter determines how many jobs will be returned from the API
    // reformat job objects to match job schema
    const reformattedJobs = jobs.map((job, index) => {
        var _a;
        try {
            if (!job.company_name || !job.season || !job.title) {
                throw new Error(`Missing fields in job at index ${index}`);
            }
            return {
                title: job.title,
                content: `Company: ${job.company_name} - Season: ${job.season}`,
                //userId: "api-generated",
                jobLink: job.url,
                jobLevel: "Unknown",
                jobLocation: ((_a = job.locations) === null || _a === void 0 ? void 0 : _a.length) ? job.locations[0] : "Unknown",
                jobHoursType: "Unkown",
                internship: true
            };
        }
        catch (err) {
            console.error("Error reformatting job:", err);
            return null;
        }
    });
    // add jobs to db
    const createdJobs = yield __1.prismaClient.job.createMany({
        data: reformattedJobs.filter((job) => job !== null),
        skipDuplicates: true,
    });
    return;
});
exports.fetchAndStoreJobs = fetchAndStoreJobs;
